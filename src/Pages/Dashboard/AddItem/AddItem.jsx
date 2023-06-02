import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxoisSecure';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_token
const AddItem = () => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgRes => {
                // console.log(imgRes);
                if (imgRes.success) {
                    const imgURL = imgRes.data.display_url;
                    const { name, price, category, recipe } = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL }
                    console.log(newItem)
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            console.log('after posting new item', data.data);
                            if(data.data.insertedId){
                                Swal.fire(
                                    'Good job!',
                                    'Data Added',
                                    'success'
                                )
                            }
                        })

                }
            })
        // console.log(data)
    };
    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Add Item </title>
            </Helmet>
            <SectionTitle header={"what's new"} title={'Add an item'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-[#F3F3F3] p-10 mr-10 space-y-5'>
                    <div className="form-control w-full max-w-xs">
                        <label className="label font-semibold">
                            <span className="label-text">Recipe*</span>
                        </label>
                        <input type="text" placeholder="Recipe" {...register("name", { required: true, maxLength: 120 })} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className='flex justify-between'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label font-semibold">
                                <span className="label-text">Recipe Name</span>
                            </label>
                            <select {...register("category", { required: true })} className="select select-bordered">
                                <option disabled selected>Pick one</option>
                                <option>Pizza</option>
                                <option>Soup</option>
                                <option>Salad</option>
                                <option>Dessert</option>
                                <option>Drinks</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label font-semibold">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="text" placeholder="Price" {...register("price", { required: true })} className="input input-bordered w-full max-w-xs" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Recipe Details*</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" {...register("recipe", { required: true })} placeholder="Recipe Details"></textarea>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Item Image*</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input w-full max-w-xs bg-slate-300" />
                    </div>
                    <div>
                        <input className='btn bg-[#B58130] px-3' type="submit" value="Add Item" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;