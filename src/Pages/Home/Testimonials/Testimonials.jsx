import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {

    const [reviews, SetReviews] = useState([])

    useEffect(() => {
        fetch('https://bistro-boss-server-six-sage.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                SetReviews(data)
            })
    }, [])
    return (
        <div className='max-w-7xl mx-auto'>
            <div>
                <SectionTitle
                    header={'What ours Client Says'}
                    title={'testimonials'}
                ></SectionTitle>
            </div>
            <div className=''>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}
                        >
                            <div className='px-36 py-16 flex flex-col items-center'>
                                <Rating
                                    style={{ maxWidth: 180, }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p>{review.details}</p>
                                <h3 className="text-2xl text-orange-500">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;