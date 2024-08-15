"use client";

import React, { useEffect } from "react";

import swal from "sweetalert";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
//import {sabtModel} from "@/models/SabtDarkhast"; 

function requset() {
 
  const router = useRouter();
  const [meliCode, setMeliCode] = useState("");
  const [rahgiry, setRahgiry] = useState("");
  const [resItem, setResItem] = useState("");
 
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user");
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
    <main>
    <div className="w-full rounded-lg bg-white p-8 my-8 flex flex-col  items-center justify-center ">
      <h1 >
        <span className={styles.texts}> میز خدمت آموزش و پرورش خراسان رضوی</span>
      </h1>
      <div >
        <section className={styles.texts}>
        <div className="w-full flex ">
                <Input
                  type="text"
                  placeholder="کد ملی"
                  readOnly={true}
                  value={meliCode}
                  onValueChange={setMeliCode}
                />
        </div>

        <div className="w-full flex ">
                <Input
                  type="text"
                  placeholder="کد رهگیری"
                
                  value={rahgiry}
                  onValueChange={setRahgiry}
                />
        </div>
        <div className="mt-8">
                <Button
                  className="bg-blue-500 text-white w-full py-2 rounded-lg mt-8"
                  onClick={getPasokh}
                  type="submit"
                  // isLoading={true}
                >
                   دریافت پاسخ 
                </Button>
              </div>
          
        <div className="w-full flex ">
                <Input
                  type="text"
                  placeholder=" پاسخ"
                
                  value={resItem}
                  onValueChange={setResItem}
                />
        </div>  
          
                   
        </section>

        
      </div>
      <div className="mt-8">
                <Button
                  className="bg-blue-500 text-white w-full py-2 rounded-lg mt-8"
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
