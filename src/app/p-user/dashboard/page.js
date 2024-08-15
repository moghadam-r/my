"use client";

//import styles from "@/src/styles/register.module.css";
// import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

function dashboard() {
  const router = useRouter();

  return (
    <main>
      <div className="w-full rounded-lg bg-white p-8 my-8 flex flex-col  items-center justify-center ">
      <form role="form" method="post" className="w-full ">
        <h1 className="font-bold text-[24px]">
          <span> میز خدمت آموزش و پرورش خراسان رضوی</span>
        </h1>
        <div className="mt-8">
                <Button
                  className="bg-blue-500 text-white w-full py-2 rounded-lg mt-8"
                  //onClick={sendCode}
                  // isLoading={true}
                  type="submit"
                  // onClick={updateUser}
        
                  onClick={() => {
                    //router.replace("/component/templates/request");
                    // <Req />;
                  }}
                >
                    ثبت درخواست
                </Button>
          </div>
          <div className="mt-8">
                <Button
                  className="bg-blue-500 text-white w-full py-2 rounded-lg mt-8"
                  //onClick={sendCode}
                  // isLoading={true}
                  type="submit"
                  // onClick={updateUser}
        
                  onClick={() => {
                    //router.replace("/component/templates/request");
                    // <Req />;
                  }}
                >
                    پیگیری درخواست
                </Button>
          </div>

        
        </form>
      </div>
      
    </main>
  );
}

export default dashboard;
