import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    const [isAdmin, isAdminLoading] = useAdmin()

    if (loading || isAdminLoading) {
        return <>
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
        </>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;