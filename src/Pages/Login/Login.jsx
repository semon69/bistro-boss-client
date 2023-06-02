import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/others/authentication2.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../shared/SocialLogin/SocialLogin';

const Login = () => {
    const { signIn} = useContext(AuthContext)
    const [disable, setDisable] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire(
                    'Good job!',
                    'Login Success',
                    'success'
                )
                navigate(from, { replace: true })
                form.reset()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleValidateCaptcha = e => {
        const captcha_value = e.target.value;
        if (validateCaptcha(captcha_value)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
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
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" placeholder="write captcha" name='captcha' className="input input-bordered" />
                                {/* <button className='btn btn-outline btn-xs mt-4'>Validate</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disable} className="btn bg-orange-300 border-0" type="submit" value="Login" />
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <div className='px-6 pb-4 my-5'>
                            <p className="label-text-alt">Dont have and account? <Link className='link link-hover' to='/register'>Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;