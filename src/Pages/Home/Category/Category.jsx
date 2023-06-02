import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from 'swiper';
import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../component/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <SectionTitle

            header={'From 11:00am to 10:00pm'}
            title={'ORDER ONLINE'}
            
            ></SectionTitle>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                
                <SwiperSlide>
                    <div>
                        <img src={slide1} alt="" />
                        <h2 className='text-3xl uppercase mb-5 -mt-16 ms-16 text-white'>Salad</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={slide2} alt="" />
                        <h2 className='text-3xl uppercase mb-5 -mt-16 ms-16 text-white'>Soup</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={slide3} alt="" />
                        <h2 className='text-3xl uppercase mb-5 -mt-16 ms-16 text-white'>pizza</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={slide4} alt="" />
                        <h2 className='text-3xl uppercase mb-5 -mt-16 ms-16 text-white'>dessert</h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={slide5} alt="" />
                        <h2 className='text-3xl uppercase mb-5 -mt-16 ms-16 text-white'>Salad</h2>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;