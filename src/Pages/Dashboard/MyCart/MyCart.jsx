import React from 'react';
import useCart from '../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyCart = () => {
    const [cart, refetch] = useCart()
    console.log(cart[0])
    const total = cart.reduce((sum, item) => item.price + sum, 0)

    const handleDelete = (item) => {

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
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })

    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || My Cart</title>
            </Helmet>
            <SectionTitle header={"My Cart"} title={"wanna add more?"}></SectionTitle>
            <div className='uppercase flex justify-evenly text-3xl font-semibold mt-10 mb-5'>
                <h3>Total Orders: {cart.length}</h3>
                <h3>Total Price: {total}</h3>
                <button className='btn btn-warning btn-sm'><Link to='/dashboard/payment'>Pay</Link></button>
            </div>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className='uppercase '>
                                <th>#</th>
                                <th>Item image</th>
                                <th>item name</th>
                                <th>price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((row, index) => <tr
                                    key={row._id}
                                >
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={row.image} alt="Food" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{row.name}</div>
                                        </div>
                                    </td>
                                    <td>${row.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(row)} className="btn bg-red-700 btn-xs"><FaTrashAlt></FaTrashAlt></button>
                                    </th>
                                </tr>)
                            }

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;