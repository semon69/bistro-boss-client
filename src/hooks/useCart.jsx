import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from './useAxoisSecure';

const useCart = () => {
    const { user, loading } = useContext(AuthContext)
    const token = localStorage.getItem('access-token')
    const [axiosSecure] = useAxiosSecure()
    const { refetch, data: cart =[] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled:!!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async ()=> {
            const response = await axiosSecure(`/carts?email=${user?.email}`)
            return response.data
        },
        // queryFn: async ()=> {
        //     const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`, {
        //         headers: {authorization: `Bearer ${token}`}
        //     })
        //     return response.json()
        // },

    })
    return [cart,refetch]
}
export default useCart;