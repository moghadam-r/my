"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import swal from "sweetalert";

import { valiadtePhone, valiadteMeliCode } from "@/utils/auth";


import { Button, Input } from "@nextui-org/react";
const Login = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [meliCode, setMeliCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const sendCode = async (event) => {
    event.preventDefault();
    const isValidPhone = valiadtePhone(phone);
    const isValidMeliCode = valiadteMeliCode(meliCode);

    if (!meliCode.trim()) {
      swal({
        title: "کد ملی را وارد نمایید",
        icon: "error",
        buttons: "تلاش مجدد",
      });
      return false;
    } else if (!phone.trim()) {
      swal({
        title: " تلفن همراه را وارد نمایید",
        icon: "error",
        buttons: "تلاش مجدد",
      });
      return false;
    }
    if (!isValidMeliCode) {
      swal({
        title: "کد ملی نادرست است",
        icon: "error",
        buttons: "تلاش مجدد",
      });
      return Response.json({ message: "Data is not valid!!" }, { status: 422 });
    } else if (isNaN(phone) || (phone.length !== 11 && !isValidPhone)) {
      swal({
        title: "  تلفن همراه نادرست است",
        icon: "error",
        buttons: "تلاش مجدد",
      });
      return Response.json({ message: "Data is not valid!!" }, { status: 422 });
    } else {
      console.log("!erorr")
      
      const res = await fetch("api/auth/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, meliCode }),
      });

      if (res.status === 201) {
        setIsCodeSent(true);
      }
    }
  };

  const verifyCode = async (event) => {
    setIsCodeSent((prev) => !prev);
    event.preventDefault();
    console.log("Verify Code !!");
    console.log(code);

    const res = await fetch("/api/auth/sms/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, code }),
    });

    if (res.status === 409) {
      swal({
        title: "کد نادرست است",
        icon: "error",
        buttons: "تلاش مجدد",
      });
    } else if (res.status === 410) {
      swal({
        title: "کد منقضی شده است",
        icon: "error",
        buttons: "تلاش مجدد",
      });
    } else if (res.status === 200) {
      router.replace("/p-user/dashboard");
    }
  };
  return (
    <>
      <div className="w-full rounded-lg bg-white p-8 my-8 flex flex-col  items-center justify-center ">
        <form role="form" method="post" className="w-full ">
          {isCodeSent ? (
            <div className="w-full flex flex-col space-y-4 items-center justify-around">
              <h1 className="font-bold text-[16px]">
                {" "}
                کد فعالسازی را وارد نمایید
              </h1>
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="کد فعال سازی"
                  required
                  value={code}
                  onValueChange={setCode}
                />
                {/* <ReactInputVerificationCode
                  type="text"
                  value={code}
                  onChange={setCode}
                  length={5}
                  autoFocus={true}
                  placeholder=""
                /> */}
              </div>
              <div className=" w-full flex items-center justify-center">
                <Button
                  className="bg-blue-500 text-white w-full py-2 rounded-lg"
                  onClick={verifyCode}
                  // isLoading={true}
                >
                  بررسی کد فعال سازی
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              <h1 className="font-bold text-[16px] mb-8">
                {" "}
                جهت ثبت و یا پیگیری درخواست وارد شوید
              </h1>
              <div className="w-full flex ">
                <Input
                  type="text"
                  placeholder="کد ملی"
                  required
                  value={meliCode}
                  onValueChange={setMeliCode}
                />
              </div>
              <div className="w-full flex">
                <Input
                  type="text"
                  placeholder="تلفن همراه"
                  required
                  value={phone}
                  onValueChange={setPhone}
                />
              </div>
              <div className="mt-8">
                <Button
                  className="bg-blue-500 text-white w-full py-2 rounded-lg mt-8"
                  onClick={sendCode}
                  // isLoading={true}
                >
                  ارسال کد فعال سازی
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
