import React from 'react';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';
import { FaTrashAlt, FaUserAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxoisSecure';

const ManageItem = () => {
    const [menu, refetch] = useMenu()
    const [axiosSecure] = useAxiosSecure()

    const handleDelete = item => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(item._id);
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Item has been deleted.',
                                'success'
                            )
                        }
                    })
                // fetch(`https://bistro-boss-server-six-sage.vercel.app/carts/${item._id}`, {
                //     method: 'DELETE'
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         console.log(data)
                //         if (data.deletedCount > 0) {
                //             refetch()
                //             Swal.fire(
                //                 'Deleted!',
                //                 'Your file has been deleted.',
                //                 'success'
                //             )
                //         }
                //     })
            }
        })

    }
    return (
        <div className='max-h-screen'>
            <Helmet>
                <title>Bistro Boss || Manage Item</title>
            </Helmet>
            <SectionTitle header={'Hurry Up'} title={'manage all item'}></SectionTitle>
            <div className=''>
                <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>UPDATE</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((mn, index) =>
                                    <tr key={mn._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={mn.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-1xl font-semibold">{mn.name}</span>
                                        </td>
                                        <td>{mn.price}</td>
                                        <th>
                                            <button className="btn bg-orange-500 btn-xs"><FaUserAlt></FaUserAlt> </button>
                                        </th>
                                        <th>
                                            <button onClick={() => handleDelete(mn)} className="btn bg-red-700 btn-xs"><FaTrashAlt></FaTrashAlt></button>
                                        </th>
                                    </tr>

                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;