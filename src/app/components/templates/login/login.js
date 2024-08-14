"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import swal from "sweetalert";

import { valiadtePhone,valiadteMeliCode } from "@/utils/auth";

import ReactInputVerificationCode from 'react-input-verification-code';
const Login=() =>{
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [meliCode, setMeliCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const sendCode = async (event) => {
    event.preventDefault();
    const isValidPhone = valiadtePhone(phone);
    const isValidMeliCode = valiadteMeliCode(meliCode);
   

      if ((!meliCode.trim() )){
        
        swal({
          title: "کد ملی را وارد نمایید",
          icon: "error",
          buttons: "تلاش مجدد",
        });
        return false;

      }else if (!phone.trim()){
        swal({
          title: " تلفن همراه را وارد نمایید",
          icon: "error",
          buttons: "تلاش مجدد",
        });
        return false;
      }
      if(!isValidMeliCode){
      swal({
        title: "کد ملی نادرست است",
        icon: "error",
        buttons: "تلاش مجدد",
      });
      return Response.json(
        { message: "Data is not valid!!" },
        { status: 422 });
      } else if ((isNaN(phone))||(phone.length !==11 )&& (!isValidPhone)) {
        swal({
          title: "  تلفن همراه نادرست است",
          icon: "error",
          buttons: "تلاش مجدد",
        });
        return Response.json(
          { message: "Data is not valid!!" },
          { status: 422 });
      
     } else {

    const res = await fetch("/api/auth/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone , meliCode}),
    });
    

    if (res.status === 201) {
      setIsCodeSent(true);
   
      
    }
   }
  };

  const verifyCode = async (event) => {
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
     <div className="box">
      <h1 align="center" > جهت ثبت درخواست وارد شوید</h1>
      <form role="form" method="post" >
        {isCodeSent ? (
          <>
          
            <div align="center" className="custom-styles">
              <ReactInputVerificationCode 
                
                type="text"
                value={code}
                onChange={ setCode}
                length={5}
                autoFocus={true}
                placeholder=""
              
              />
            
            </div>
            <div >
            <input 
              type="submit"
              className="register-btn"
              value="بررسی کد فعال سازی"
              onClick={verifyCode}
            />
            </div>
          </>
        ) : (
          <>
            <div  className="inputBox">
              <input
                type="text"
                autoComplete="off"
                required
                value={meliCode}
                onChange={(event) => setMeliCode(event.target.value)}
                
              />
              <label >کد ملی</label>
            </div>
            <div className="inputBox">
              <input
              id="CM"
                type="text"
                autoComplete="off"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                
              />
              <label >تلفن همراه</label>
            </div>
            <div align="center">
               <input 
              type="submit"
              className="register-btn"
              value=" ارسال کد فعال سازی"
              onClick={sendCode}
            />
            </div>
           
            
          </>
        )}
      </form>
    </div>
    </>
   
     
  );
}

export default Login;