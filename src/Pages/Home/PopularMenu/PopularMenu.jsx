import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import MenuItem from '../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu()
    const popularItem = menu.filter(item => item.category === 'popular')
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <SectionTitle
            header={'Check It Out'}
            title={'FROM OUR MENU'}
            ></SectionTitle>
            <section className='grid md:grid-cols-2 gap-10'>
                {
                    popularItem.map(item => <MenuItem
                    key={item._id}
                    item = {item}
                    ></MenuItem>)
                }
            </section>
        </div>
    );
};

export default PopularMenu;