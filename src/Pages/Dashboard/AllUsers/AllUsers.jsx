import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import { FaTrashAlt, FaUserAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxoisSecure';

const AllUsers = () => {

    const [axiosSecure] = useAxiosSecure()

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data
    })

    const handleMakeId = user => {
        fetch(`https://bistro-boss-server-six-sage.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount > 0){
                    refetch()
                    Swal.fire(
                        'Good job!',
                        `${user.name} is admin now`,
                        'success'
                    )
                }
            })

    }

    const handleDelete = () => {

    }

    return (
        <div className='max-h-screen'>
            <Helmet>
                <title>Bistro Boss || All Users</title>
            </Helmet>

            <SectionTitle header={"How Many?"} title={"MANAGE ALL USERS"}></SectionTitle>
            <h2 className='uppercase text-3xl my-4'>Total User: {users.length}</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td> {user?.role ? 'admin' :
                                            <button onClick={() => handleMakeId(user)} className="btn bg-orange-500 btn-xs"><FaUserAlt></FaUserAlt></button>
                                        } </td>
                                        <td><button onClick={() => handleDelete(user)} className="btn bg-red-700 btn-xs"><FaTrashAlt></FaTrashAlt></button></td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;