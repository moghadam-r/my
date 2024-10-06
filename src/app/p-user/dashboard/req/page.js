"use client";

import React, { useEffect } from "react";
//import styles from "@/src/styles/register.module.css";
import styles from "./request.module.css"
import swal from "sweetalert";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";


import localFont from 'next/font/local'
const myFont = localFont({ src: './fonts/Shabnam-FD.woff2' })

function requset() {
  //const [value, setValue] = React.useState("");
  // const [inputValue, setInputValue] = React.useState('');
  const router = useRouter();
  const [meliCode, setMeliCode] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [edare, setEdare] = useState("");
  const [darkhast, setDarkhast] = useState("");

  const [pasokh, setPasokh] = useState("");
  const [pKey, setPKey] = useState("");





  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      console.log("===========+++")
     // if (res.ok) {
        if (data ) {//&& data.length) {
          console.log(data)
          setMeliCode(data?.meliCode);
          setMeliCode(data?.meliCode);
          setPhone(data?.phone);
          setPKey(data.pKey);
        }
        else {
          swal({
            title: "خطا در ثبت اطلاعات",
            icon: "error",
            buttons: "تلاش مجدد",
          }).then(() => {
            router.replace("/");
          });
        }
      //} else {
      //  console.log(res.statusText)
     // }



    };
    getUser();
  }, []);
  const saveDarkhast = async (event) => {

    const rahgiry = Math.floor(Math.random() * 99999);
    event.preventDefault();


    // }
    if (!name.trim()) {
      swal({
        title: " نام را وارد نمایید",
        icon: "error",
        buttons: "تلاش مجدد",
      });
      // return false;
    } else if (!family.trim()) {
      swal({
        title: "نام خانوادگی را وارد نمایید",
        icon: "error",
        buttons: "تلاش مجدد",
      });
    } else if (!darkhast.trim()) {
      swal({
        title: "  درخواست  را وارد نمایید",
        icon: "error",
        buttons: "تلاش مجدد",
      });

    } else {
      const res = await fetch("/api/dashboard/Req/sabt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pKey, name, family, darkhast, rahgiry, pasokh, phone, meliCode }),
      });
      if (res.status === 200) {


        swal({
          title: `:درخواست شما با کد رهگیری ${rahgiry}  ثبت شد`,
          icon: "success",
          buttons: "تایید ",
        }).then(() => {
          router.replace("/");
        });
      }
    }

  }





  return (
    <main className="w-full h-full rounded-lg bg-white p-8 my-8 flex flex-col  items-center justify-center gap-4" >
      <h1 >
        <span className="text-2xl"> میز خدمت آموزش و پرورش خراسان رضوی</span>
      </h1>
      <div className=" grid grid-cols-3  bg-blue-500 bg-opacity-20  h-auto  p-4 rounded-lg ">



        <div className="w-full text-right items-start justify-start pad p-2 col-span-2">

          <Input

            value={meliCode}
            readOnly={true}
            placeholder="کد  ملی"
            // onChange={(event) => setMeliCod(event.target.value)}
            type="text"

          />
        </div>
        <div className="w-full text-right items-start justify-start p-2 col-span-2">

          <Input
            value={phone}
            readOnly={true}
            placeholder="تلفن همراه "
            //  onChange={(event) => setPhone(event.target.value)}
            type="text"
          />

        </div>

        <div className="w-full text-right items-start justify-start p-2 col-span-2">

          <Input
            value={name}
            placeholder="نام "
            //onChange={(event) => setName(event.target.value)}
            onValueChange={setName}
            type="text"
            autoFocus={true}

          />

        </div>
        <div className="w-full text-right items-start justify-start p-2 col-span-2">

          <Input
            value={family}
            placeholder="نام خانوادگی "
            //onChange={(event) => setName(event.target.value)}
            onValueChange={setFamily}
            type="text"
          //autoFocus={true}
          />

        </div>

        <div className="w-full col-span-2 text-right items-start justify-start p-2 col-span-3 ">

          <Textarea
            value={darkhast}
            placeholder="درخواست"
            //onChange={(event) => setName(event.target.value)}
            onValueChange={setDarkhast}
            type="text"
          //autoFocus={true}
          />

        </div>
        <div className=" w-full col-span-1 text-right items-start justify-start p-2 col-span-2 " >
          <Button
            className="bg-blue-500 text-white w-full py-2 rounded-lg"
            onClick={saveDarkhast}
          // isLoading={true}
          >
            ثبت درخواست
          </Button>

        </div>
        <div className=" w-full col-span-1 text-right items-start justify-start p-2 " >
          <Button
            className="bg-blue-500 text-white w-full py-2 rounded-lg"
          // onClick={saveDarkhast}
          // isLoading={true}
          >
            انصراف
          </Button>

        </div>

      </div>
    </main>

  );
}

export default requset;
