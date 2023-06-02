import React from 'react';
import fImg from '../../../assets/home/featured.jpg'
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import '../FeaturedItem/FeaturedItem.css'

const FeaturedItem = () => {
    return (
        <div className='featured bg-fixed'>
            <div className='max-w-7xl mx-auto '>
                <div className='text-white pt-8'>
                    <SectionTitle
                        header={'check it out'}
                        title={'from our menu'}
                    ></SectionTitle>
                </div>
                <div className='flex justify-center items-center gap-16 pt-10 pb-14 px-24'>
                    <div>
                        <img src={fImg} alt="" />
                    </div>
                    <div className='text-white'>
                        <p>March 20, 2023</p>
                        <p className='uppercase'>WHERE CAN I GET SOME?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nulla quibusdam, voluptate cumque, ullam voluptatibus, facere repudiandae illo vero fuga id ad impedit aliquam dolore qui a eum omnis. Voluptates facere hic cumque minima atque. Hic voluptas deserunt saepe, optio omnis ad repellat excepturi blanditiis necessitatibus culpa explicabo quas vel.</p>
                        <button className="btn btn-outline border-0 border-b-4 text-white mt-4">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedItem;