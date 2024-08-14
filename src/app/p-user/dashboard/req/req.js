"use client";

import React, { useEffect } from "react";
//import styles from "@/src/styles/register.module.css";
import styles from "./request.module.css"
import swal from "sweetalert";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";



import localFont from 'next/font/local'
const myFont = localFont({ src: './fonts/Shabnam-FD.woff2' })

import Select from 'react-select';




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
      if (data){
        console.log(data)
        setMeliCode(data?.meliCode);
        setMeliCode(data?.meliCode);
        setPhone(data?.phone);
        setPKey(data.pKey);}
        else{
          swal({
            title: "خطا در ثبت اطلاعات",
            icon: "error",
          buttons: "تلاش مجدد",
          }).then(() => {
            router.replace("/");
          });
        }
      
      
      
    };
    getUser();
  }, []);
  const saveDarkhast=async(event)=>{
    
    const rahgiry= Math.floor(Math.random() * 99999);
    event.preventDefault();
          
        
   // }
   if (!name.trim()){
    swal({
      title: " نام را وارد نمایید",
      icon: "error",
      buttons: "تلاش مجدد",
    });
   // return false;
  } else if (!family.trim()){
    swal({
      title: "نام خانوادگی را وارد نمایید",
      icon: "error",
      buttons: "تلاش مجدد",
    });
  }else if (!darkhast.trim()){
    swal({
      title: "  درخواست  را وارد نمایید",
      icon: "error",
      buttons: "تلاش مجدد",
    });
  }else if (!edare.trim()){
    swal({
      title: "  اداره مربوطه را تعیین نمایید",
      icon: "error",
      buttons: "تلاش مجدد",
    });
  }else{
    const res = await fetch("/api/sabt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pKey,name, family, edare, darkhast, rahgiry,pasokh,phone,meliCode}),
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
  

  const edareKh = [
  { label: 'اداره کل', value: '1600' },
  { label: 'ناحیه یک', value: '1601' },
  { label: 'ناجیه دو', value: '1602' },
  { label: 'ناحیه سه', value: '1603' },
  { label: 'ناحیه چهار', value: '1604' },
  { label: 'ناحیه پنج', value: '1605' },
];

 
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
             // onChange={(event) => setMeliCod(event.target.value)}
              type="text"
            />
          </div>
          <div >
            <label className={styles.lbMobile} >تلفن همراه</label>
            <input className={styles.input}
              value={phone}
              readOnly={true}
            //  onChange={(event) => setPhone(event.target.value)}
              type="text"
            />
            
          </div>
          
          <div >
            <label className={styles.lbName} >نام</label>
            <input className={styles.input}
              value={name}
              
              onChange={(event) => setName(event.target.value)}
              type="text"
              autoFocus={true}
            />
            
          </div>
          <div >
            <label className={styles.lbFamily} >نام خانوادگی</label>
            <input className={styles.input}
              value={family}
              
              onChange={(event) => setFamily(event.target.value)}
              type="text"
            />
            
          </div>
          
          <div className={styles.lbarea}>
             <label className={styles.lbRequest} >درخواست </label>
             <textarea className={styles.inputRequest}
             value={darkhast}
            
             onChange={(event) => setDarkhast(event.target.value)}
              type="text"
            />
          </div>
         
          
        <div>
       
        <div className={styles.combobox}>
           <label className={styles.lbRequest} >اداره </label>
           <div className={styles.divcombo}>
           <Select
            options={edareKh}
            onChange={opt => { setEdare(opt.value)}}
            placeholder={"ناحیه/شهرستان/منطقه"}
            
          />
           
            </div>
           
        </div>



        </div>

          
          
        </section>

        
      </div>
      <button
        type="submit"
        onClick={saveDarkhast}
        className={styles.btn}
      >
        ثبت درخواست
      </button>
    </div>
  </main>
   
  );
}

export default requset;
