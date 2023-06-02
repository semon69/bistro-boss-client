import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import useCart from '../../../hooks/useCart';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCart()
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }
    const navItem = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order/salad'>Order Food</Link></li>
        <li>
            <Link to='/dashboard/mycart'>
                <button className="btn gap-2">
                    <FaShoppingCart></FaShoppingCart>
                    <span className="badge badge-secondary">+{cart?.length || 0}</span>
                </button>
            </Link>
        </li>
        <li>

            {
                user ?
                    <>
                        <button onClick={handleLogout} className='btn btn-black'>Log Out</button>
                    </>
                    :
                    <>
                        <li><Link to='/login'>Login</Link></li>
                    </>
            }

        </li>
    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-30  bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                navItem
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Bistro-Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navItem
                        }
                    </ul>
                </div>
                <div className="navbar-end mr-5">
                    {
                        user ?
                            <img title={user.displayName} className='w-12 rounded-full' src={user.photoURL} alt="" />
                            : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;