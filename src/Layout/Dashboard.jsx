import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaCalendarAlt, FaWallet, FaBars, FaShopify, FaUserAlt, FaBook, FaUtensils } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart()
    // const isAdmin = true;
    const [isAdmin] = useAdmin()
    console.log(isAdmin)
    return (
        <div className='max-w-7xl mx-auto'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content my-10 mx-16">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content  py-12">

                        {
                            isAdmin ?
                                <>
                                    <li><NavLink to='/dashboard/adminHome'><FaHome /> ADMIN HOME</NavLink> </li>
                                    <li><NavLink to='/dashboard/addItem'><FaUtensils /> ADD ITEMS</NavLink> </li>
                                    <li><NavLink to='/dashboard/manageItem'><FaBars /> MANAGE ITEMS</NavLink> </li>
                                    <li><NavLink to='/dashboard/manageBookings'><FaBook /> MANAGE BOOKINGS</NavLink> </li>
                                    <li><NavLink to='/dashboard/allUsers'><FaUserAlt /> ALL USERS</NavLink> </li>
                                </> :
                                <>
                                    <li><NavLink to='/dashboard/userHome'><FaHome /> USER HOME</NavLink> </li>
                                    <li><NavLink to='/dashboard/reservation'><FaCalendarAlt /> RESERVATION</NavLink> </li>
                                    <li><NavLink to='/dashboard/payment'><FaWallet /> PAYMENT HISTORY</NavLink> </li>
                                    <li><NavLink to='/dashboard/mycart'><FaShoppingCart /> MY CART <span className="badge badge-secondary">+{cart?.length || 0}</span></NavLink> </li>
                                </>
                        }



                        <div className="divider"></div>
                        <li><NavLink to='/'><FaHome /> HOME</NavLink></li>
                        <li><NavLink to='/menu'><FaBars /> MENU</NavLink></li>
                        <li><NavLink to='/order/salad'> <FaShopify /> SHOP</NavLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;