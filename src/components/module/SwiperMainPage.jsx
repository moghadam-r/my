"use client"

import React, { useState } from 'react'

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// core version + navigation, pagination modules:
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/swiper-bundle.css";
import { AiFillAlert } from "react-icons/ai";
import { AiFillBank } from "react-icons/ai";
import { AiFillAndroid } from "react-icons/ai";
function SwiperMainPage({ data }) {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [date, setDate] = useState("")

    const showNews = (title, body, image, date) => {
        setTitle(title);
        setDate(date);
        setBody(body);
        setImage(image)
        onOpen()
        // console.log("Title==>", title)
    }

    return (

        <section className=" overflow-hidden w-full h-80 ">
            <div className='w-full  h-80 '>
                <ul  >
                    <Swiper

                        // navigation
                        pagination={{
                            clickable: true,
                            "renderBullet": function (index, className) {

                                return '<span>' + (index + 1) + '</span>';

                            }
                        }}
                        // pagination={{ type: "bullets", clickable: true }}
                        autoplay={true}
                        loop={true}
                        spaceBetween={10}
                        // slidesPerView={2}
                        modules={[Autoplay]}
                        className="w-full overscroll-x-none rounded-lg "
                    >
                        {data.map(({ id, image, tagline, title, buttons, date }) => (

                            <SwiperSlide key={id}>

                                <div className="h-72 w-full absolute left-0 top-0 bg-primary-600 opacity-20 p-8"></div>
                                <div className="relative z-10 h-72 flex items-center justify-center p-8 ">
                                    <div className="grid grid-cols-3 grid-rows-2 w-full h-full gap-2 ">
                                        <div className='bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer'>
                                            <span className='text-[36px]'><AiFillAndroid /></span>
                                            <p>اتوماسیون اداری</p>

                                        </div>
                                        <div className='bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer'>
                                            <span className='text-[36px]'><AiFillAlert /></span>
                                            <p>اتوماسیون اداری</p>

                                        </div>
                                        <div className='bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer'>
                                            <span className='text-[36px]'><AiFillBank /></span>
                                            <p>اتوماسیون اداری</p>

                                        </div>
                                        <div className='bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer'>
                                            <span className='text-[36px]'><AiFillAndroid /></span>
                                            <p>اتوماسیون اداری</p>

                                        </div>
                                        <div className='bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer'>
                                            <span className='text-[36px]'><AiFillAndroid /></span>
                                            <p>اتوماسیون اداری</p>

                                        </div>
                                        <div className='bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer'>
                                            <span className='text-[36px]'><AiFillAlert /></span>
                                            <p>اتوماسیون اداری</p>

                                        </div>



                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ul>
            </div>

        </section>

    )
}

export default SwiperMainPage