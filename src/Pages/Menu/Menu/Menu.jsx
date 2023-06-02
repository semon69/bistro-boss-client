import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu()
    const offered = menu.filter(item => item.category === 'offered')
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title='our menu'></Cover>
            <SectionTitle header={"Don't Miss"} title={"today's offer"}></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} img={dessertImg} title={'dessert'}></MenuCategory>
            <MenuCategory items={pizza}  img={pizzaImg} title={'pizza'}></MenuCategory>
            <MenuCategory items={salad} img={saladImg} title={'salad'}></MenuCategory>
            <MenuCategory items={soup} img={soupImg} title={'soup'}></MenuCategory>
        </div>
    );
};

export default Menu;