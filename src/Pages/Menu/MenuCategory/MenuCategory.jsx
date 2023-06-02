import React from 'react';
import MenuItem from '../../shared/MenuItem/MenuItem';
import { Link } from 'react-router-dom';
import Cover from '../../shared/Cover/Cover';

const MenuCategory = ({ items, title, img }) => {
    return (
        <div>
            {title && <Cover img={img} title={title}></Cover>}
            <div className='max-w-7xl mx-auto my-14'>

                <section className='grid md:grid-cols-2 gap-10'>
                    {
                        items.map(item => <MenuItem
                            key={item._id}
                            item={item}
                        ></MenuItem>)
                    }
                </section>
                <div className='text-center'>
                    <Link to={`/order/${title}`}>
                        <button className="btn btn-outline bg-zinc-200 border-0 border-b-4 mt-4">Order Your Favorite Food</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuCategory;