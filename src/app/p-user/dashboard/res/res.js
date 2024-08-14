"use client";

import React, { useEffect } from "react";
import styles from "./response.module.css";
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
    <div className={styles.form}>
      <h1 >
        <span className={styles.texts}> میز خدمت آموزش و پرورش خراسان رضوی</span>
      </h1>
      <div >
        <section className={styles.texts}>
        <div >
            <label className={styles.lbCodeMeli} > کد ملی</label>
            <input
            className={styles.input}
               value={meliCode}
               readOnly={true}
               onChange={(event) => setMeliCode(event.target.value)}
              type="text"
            />
          </div>
          <div >
            <label className={styles.lbrahgiry} > کد رهگیری</label>
            <input
            className={styles.input}
              value={rahgiry}
               onChange={(event) => setRahgiry(event.target.value)}
              type="text"
              
            />
          </div>
          <div >
          <button
           type="submit"
            onClick={getPasokh}
            className={styles.btnPasokh}
            >
            دریافت پاسخ 
         </button>
          </div>
          
          <div className={styles.lbarea} >
            <label className={styles.lbpasokh} >پاسخ</label>
            <textarea className={styles.inputArea}
              value={resItem}
             
              onChange={(event) => setResItem(event.target.value)}
              type="text"
            />
            
          </div>
          
        </section>

        
      </div>
      <button
        //type="submit"
       onClick={goToHomePage}
        className={styles.btn}
      >
        تایید 
      </button>
    </div>
  </main>
   
  );
}

export default requset;
