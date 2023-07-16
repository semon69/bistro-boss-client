import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"

const useMenu = () => {
    // const [menu, setMenu] = useState([])
    // useEffect(()=> {
    //     fetch('https://bistro-boss-server-six-sage.vercel.app/menu')
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenu(data)
    //     })
    // },[])

    const {data: menu =[], isLoading: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await fetch('https://bistro-boss-server-six-sage.vercel.app/menu');
            return res.json()
        }
    })
    return [menu, refetch, loading]
}
export default useMenu;