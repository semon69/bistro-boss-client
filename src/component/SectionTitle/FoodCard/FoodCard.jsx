import React, { useContext } from 'react';
import altImg from '../../../assets/menu/pizza-bg.jpg'
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../../hooks/useCart';

const FoodCard = ({ item }) => {
    const { name, recipe, image, price, _id } = item;
    const { user } = useContext(AuthContext);
    const [cart , refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleAddToCart = item => {
        console.log(item);
        if (user) {
            const cartItem = { menuFoodId: _id, name, image, price, email: user.email }
            fetch('https://bistro-boss-server-six-sage.vercel.app/carts', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {

                        Swal.fire(
                            'Good job!',
                            'Add To Cart Successfully',
                            'success'
                        )
                        refetch();
                    }

                })
        }
        else {
            Swal.fire({
                title: 'You have to login first',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    return (
        <div className=''>
            <div className="card w-96 bg-base-100 shadow-xl h-[520px]">
                <figure><img src={image} /></figure>
                <p className='bg-orange-600 text-white absolute right-5 top-5 px-3 rounded'>${price}</p>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end flex flex-col items-center">
                        <button onClick={() => handleAddToCart(item)} className="btn btn-outline bg-zinc-200 text-orange-500 border-0 border-b-4 mt-4">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;