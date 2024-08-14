

//import styles from "@/src/styles/register.module.css";
import styles from "./dashboard.module.css"
import { useRouter } from "next/navigation";



function dashboard() {
  
  const router = useRouter();

  return (
    <main>
    <div className={styles.formDashboard}>
      <h1 >
        <span className={styles.texts}> میز خدمت آموزش و پرورش خراسان رضوی</span>
      </h1>
     
          
        <button
        type="submit"
       // onClick={updateUser}
        className={styles.btn
        }
        onClick={() => {
          //router.replace("/component/templates/request");
          <Req/>
        }}
      >
        ثبت درخواست
       </button>
      
       <button
        type="submit"
       // onClick={updateUser}
        className={styles.btn}
        onClick={() => {
         // router.replace("/component/templates/response");
          <Res />
        }}
      >
        پیگیری درخواست
       </button>
        
      </div>
      
   
  </main>
   
  );
}

export default dashboard;
