import React, { useContext } from 'react';
import loginImg from '../../assets/others/authentication2.png'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../shared/SocialLogin/SocialLogin';

const Registration = () => {
    const { createUser, profileUpdate, logOut, googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleRegister = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        createUser(email, password)
            .then(result => {
                console.log(result)
                profileUpdate(name, photo)
                    .then(() => {
                        const savedUser = { name: name, email: result.user.email }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId > 0) {
                                    Swal.fire(
                                        'Good job!',
                                        'Registration Success. Please Login now',
                                        'success'
                                    )
                                }
                            })

                    })
                    .catch(err => console.log(err))
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name='name' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Photo URL" name='photo' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn bg-orange-300 border-0" type="submit" value="Sign Up" />
                            </div>
                        </form>

                        <SocialLogin></SocialLogin>

                        <div className='px-6 pb-4 my-5'>

                            <p className="label-text-alt">Dont have and account? <Link className='link link-hover' to='/login'>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;