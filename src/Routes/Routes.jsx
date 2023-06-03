import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Login/Registration";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import Reservation from "../Pages/Dashboard/Reservation/Reservation";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import ManageItem from "../Pages/Dashboard/MageItem/ManageItem";
import AdminRoutes from "./AdminRoutes";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            }
        ]
    },
    {
        path:'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> ,
        children: [
            {
                path:'mycart',
                element: <MyCart></MyCart>
            },
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'reservation',
                element: <Reservation></Reservation>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            }, 
            {
                path:'adminHome',
                element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
            },
            {
                path: 'allUsers',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path: 'addItem',
                element: <AdminRoutes><AddItem></AddItem></AdminRoutes>
            },
            {
                path: 'manageItem',
                element: <AdminRoutes><ManageItem></ManageItem></AdminRoutes>
            },
            {
                path: 'manageBookings',
                element: <AdminRoutes><ManageBookings></ManageBookings> </AdminRoutes>
            },
            
        ]
    }
]);