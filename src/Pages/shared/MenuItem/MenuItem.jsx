import React from 'react';

const MenuItem = ({item}) => {

    const {name, recipe, image, price} = item
    return (
        <div  className='flex justify-center gap-3 my-7'>
            <img style={{borderRadius: '0px 200px 200px 200px'}} className='w-[110px]' src={image} alt="Food" />
            <div className='text-zinc-600'>
                <h1 className='uppercase'>{name}-----------</h1>
                <p>{recipe}</p>
            </div>
            <p className='text-orange-400'>${price}</p>
        </div>
    );
};

export default MenuItem;