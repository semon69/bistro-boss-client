import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const savedUser = { name: result.user.displayName, email: result.user.email }
                fetch('https://bistro-boss-server-six-sage.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                            Swal.fire(
                                'Good job!',
                                'Registration Success. Please Login now',
                                'success'
                            )
                            navigate(from, { replace: true })
                    })
                
            })
            .then(error => {
                // console.log(error)
            })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className='w-2/3 mx-auto mt-6'>
                <button onClick={handleGoogleSignIn} className='border px-3 py-1 flex justify-center items-center'><FaGoogle></FaGoogle> <span className='ms-2'>Continue With Google</span> </button>
            </div>
        </div>
    );
};

export default SocialLogin;