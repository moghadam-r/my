"use client";

import React, { useEffect } from "react";
import swal from "sweetalert";
import Link from "next/link";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { roles } from "./data";


//import localFont from 'next/font/local'
//const myFont = localFont({ src: './fonts/Shabnam-FD.woff2' })

function register() {
    //const [value, setValue] = React.useState("");
    // const [inputValue, setInputValue] = React.useState('');
    const router = useRouter();
    const [personeli, setPersoneli] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [family, setFamily] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [pKey, setPKey] = useState("");






    const userRegister = async () => {
        console.log("role", role)
        console.log(shamsi.gregorianToJalali(1989, 1, 24))

        if (!family.trim()) {
            swal({
                title: " نام را وارد نمایید",
                icon: "error",
                buttons: "تلاش مجدد",
            });
            ;
        } else if (!name.trim()) {
            swal({
                title: "نام خانوادگی را وارد نمایید",
                icon: "error",
                buttons: "تلاش مجدد",
            });
        } else if (!personeli.trim()) {
            swal({
                title: "  پرستلی  را وارد نمایید",
                icon: "error",
                buttons: "تلاش مجدد",
            });

        } else if (!phone.trim()) {
            swal({
                title: "  تلفن همراه  را وارد نمایید",
                icon: "error",
                buttons: "تلاش مجدد",
            });

        } else if (!userName.trim()) {
            swal({
                title: "  نام کاربری  را وارد نمایید",
                icon: "error",
                buttons: "تلاش مجدد",
            });

        } else if (!password.trim()) {
            swal({
                title: "  رمز عبور  را وارد نمایید",
                icon: "error",
                buttons: "تلاش مجدد",
            });

            } else if (!role.trim()) {
                swal({
                    title: "  نقش  را وارد نمایید",
                    icon: "error",
                    buttons: "تلاش مجدد",
                });

        }

        else {
            const res = await fetch("/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, family, personeli, userName, password, phone,role }),
            });
            if (res.status === 200) {


                swal({
                    title: `:کاربر  با نام کاربری  ${userName}  ثبت شد`,
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
                        value={family}
                        placeholder="نام خانوادگی "
                        //onChange={(event) => setName(event.target.value)}
                        onValueChange={setFamily}
                        type="text"
                    //autoFocus={true}
                    />
                </div>
                <div className="w-full text-right items-start justify-start pad p-2 col-span-2">

                    <Input

                        value={name}
                        onValueChange={setName}
                        placeholder="نام"
                        // onChange={(event) => setMeliCod(event.target.value)}
                        type="text"

                    />
                </div>
                <div className="w-full text-right items-start justify-start pad p-2 col-span-2">

                    <Input

                        value={personeli}
                        onValueChange={setPersoneli}
                        placeholder="پرسنلی"
                        // onChange={(event) => setMeliCod(event.target.value)}
                        type="text"

                    />
                </div>
                <div className="w-full text-right items-start justify-start pad p-2 col-span-2">

                    <Input

                        value={phone}
                        onValueChange={setPhone}
                        placeholder="تلفن همراه"
                        // onChange={(event) => setMeliCod(event.target.value)}
                        type="text"

                    />
                </div>
                <div className="w-full text-right items-start justify-start pad p-2 col-span-2">

                    <Input

                        value={userName}
                        onValueChange={setUserName}
                        placeholder="نام کاربری"
                        // onChange={(event) => setMeliCod(event.target.value)}
                        type="text"

                    />
                </div>
                <div className="w-full text-right items-start justify-start pad p-2 col-span-2">

                    <Input

                        value={password}
                        onValueChange={setPassword}
                        placeholder="کلمه عبور"
                        // onChange={(event) => setMeliCod(event.target.value)}
                        type="text"

                    />
                </div>
                <div className="w-full text-right items-start justify-start p-2 col-span-2">

                    <Select
                        items={roles}
                        onChange={(item) => {
                            setRole(item.target.value)
                            console.log(item.target.value)

                        }}
                        placeholder="تعیین نقش کاربر جدید "
                        className="max-w-xs"
                    >
                        {roles.map((role) => (
                            <SelectItem key={role.key} >
                                {role.label}
                            </SelectItem>
                        ))}
                    </Select>

                </div>

                <div className=" w-full col-span-1 text-right items-start justify-start p-2 col-span-2 " >
                    <Button
                        className="bg-blue-500 text-white w-full py-2 rounded-lg"
                        onClick={() => { userRegister() }}
                    // isLoading={true}
                    >
                        ثبت کاربر
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

export default register;
