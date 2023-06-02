import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/shared/Footer/Footer';
import Navbar from '../Pages/shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation()
    const noHeadNav = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            {noHeadNav || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeadNav || <Footer></Footer>}
        </div>
    );
};

export default Main;