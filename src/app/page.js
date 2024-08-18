"use client";

import "./globals.css";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import dataSlider from "@/data/slider-data.json";

// core version + navigation, pagination modules:
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperMainPage from "@/components/module/SwiperMainPage";
import Login from "./components/templates/login/login";

export default function Home() {
  return (
    <main className=" h-screen w-screen flex-col items-center justify-between p-24 bg-blue-600 grid grid-cols-5 gap-2 bg-gradient-to-r from-cyan-500 to-blue-500">
      <section className="col-span-5 lg:col-span-3 bg-blue-500 bg-opacity-20  lg:h-full h-auto  p-4 rounded-lg ">
        <div className="w-full text-right items-start justify-start">
          <Input
            type="text"
            label=""
            placeholder="جستجو"
            className="text-right"
            labelPlacement="inside"
            startContent={
              <CiSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="my-12 text-white font-bold  text-center">
            با ورود به پیشخوان مجازی از خدمات زیر بهره مند شوید
          </p>
          <div className="w-full h-full">
            <SwiperMainPage data={dataSlider} />
          </div>
        </div>
      </section>
      <section className="col-span-5 lg:col-span-2 bg-blue-800 lg:h-full h-auto p-4 rounded-lg flex items-center flex-col justify-center w-full bg-gradient-to-r from-blue-800 to-indigo-900 ">
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg gap-2 w-full">
          <img src="./images/itLogo.png" height={64} width={64} className="" />
          <p className="font-bold mt-8">میز خدمت داره کل آموزش و پرورش خراسان رضوی</p>
          
        </div>
        <Login />
        <Link
          href={"/"}
          className="flex bg-blue-100 rounded-lg h-12 mt-4 items-center justify-center text-blue-900 cursor-pointer w-full"
        >
          ورود از طریق شماره همراه
        </Link>
        <div className="grid grid-cols-3 mt-4 gap-2 w-full">
          <Link
            href={"/"}
            className="col-span-1 flex items-center justify-center h-12 bg-blue-50 rounded-lg"
          >
            پنل مدیریت
          </Link>
          <Link
            href={"/"}
            className="col-span-1 flex items-center justify-center h-12 bg-blue-50 rounded-lg"
          >
            راهنمای سامانه
          </Link>
          <Link
            href={"/"}
            className="col-span-1 flex items-center justify-center h-12 bg-blue-50 rounded-lg"
          >
            سوالات متداول
          </Link>
        </div>
      </section>
    </main>
  );
}
