"use client";

import React, { useEffect } from "react";

import swal from "sweetalert";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input,Button,Textarea } from "@nextui-org/react";
//import {sabtModel} from "@/models/SabtDarkhast"; 

function requset() {
 
  const router = useRouter();
  const [meliCode, setMeliCode] = useState("");
  const [rahgiry, setRahgiry] = useState("");
  const [resItem, setResItem] = useState("");
 
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user/getAll");
      const data = await res.json();
      if (data){
     
      setMeliCode(data?.meliCode);}
      else{
        swal({
          title: "کد ملی معتبر نمی باشد",
          icon: "error",
        buttons: "تلاش مجدد",
        }).then(() => {
          router.replace("/");
        });
      }
      
    };
    getUser();
  }, []);

    const getPasokh = async () => {
      if (!rahgiry.trim()){
        swal({
          title: " کد رهگیری  را وارد نمایید",
          icon: "error",
          buttons: "تلاش مجدد",
        });
       // return false;
      }

      const res = await fetch(`/api/resp/${meliCode}/${rahgiry}`);
      if (res.status==200){
      const data = await res.json();
      if (data){
        console.log("pasokh===>",data)
        setResItem(data)
      }
        else{
          swal({
            title: "درخواستی برای این کد ملی با این کد رهگیری ثبت نشده است",
            icon: "error",
            buttons: "تلاش مجدد",
          }).then(() => {
            router.replace("/");
          });
        }
      
      }
        
    };
   const goToHomePage = () =>{
    router.replace("/");
   
  }


  return (
    <main className= "w-full h-full rounded-lg bg-white p-8 my-8 flex flex-col  items-center justify-center gap-4">
   
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
                  type="text"
                  placeholder="کد رهگیری"
                
                  value={rahgiry}
                  onValueChange={setRahgiry}
                />
         </div>
        <div className="w-full col-span-3 text-right items-start justify-start p-2 col-span-2">
                <Button
                  className="bg-blue-500 text-white w-full py-2 rounded-lg"
                  onClick={getPasokh}
                  type="submit"
                  // isLoading={true}
                >
                   دریافت پاسخ 
                </Button>
          </div>
          
        <div className="w-full col-span-2 text-right items-start justify-start p-2 col-span-3 ">
                <Textarea
                  readOnly={true}
                  type="text"
                  placeholder=" پاسخ"
                  value={resItem}
                  onValueChange={setResItem}
                />
        </div>  
         
        <div className="w-full col-span-2 text-right items-start justify-start p-2 col-span-3 ">
                <Button
                  className="bg-blue-500 text-white w-full py-2 rounded-lg"
                  onClick={goToHomePage}             
                >
                    تایید 
                </Button>
        </div>
     
    </div>
    
  </main>
   
  );
}

export default requset;
