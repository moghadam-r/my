"use client";
import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination } from "@nextui-org/react";
export default function allReqs() {
    const [tempReqs, setAllTempReqs] = useState([]);
    const [reqs, setAllReqs] = useState([]);
    const [req, setReq] = useState();
    const [resItem, setResItem] = useState();
    const [meliCode, setmeliCode] = useState();
    const [rahgiry, setRahgiry] = useState();
    const [answer, setAnswer] = useState([]);
    const [isVisit, setisVisit] = useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);
    const pages = Math.ceil(reqs.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return reqs.slice(start, end);
    }, [page, reqs]);
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["وضعیت پاسخ :"]));
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join("* ").replaceAll("_", " "),
        [selectedKeys]
    );
    const bottomContent = React.useMemo(() => {
        return (
          <div className="py-2 px-2 flex justify-between items-center bg-white flex-row-reverse">
            <Pagination
              showControls
              classNames={{
                cursor: "bg-foreground text-background",
              }}
              color="default"
             
              page={page}
              total={pages}
              variant="light"
              onChange={setPage}
            />
            <span className="text-small text-default-400 ">
              {selectedKeys === "all"
                ? "تمامی موارد انتخاب شدند"
                : `${selectedKeys.size}  انتخاب از   ${items.length}    `}
            </span>
          </div>
        );
      }, [ items.length, page, pages]);
    useEffect(() => {
        const getRequests = async () => {
            const res = await fetch("/api/dashboard/Req/getAll");
            //window.alert(res.statusText)
            const data = await res.json();
            console.log("data====>", data)
            if (data && data.length) {
                setAllReqs(data);
                setAllTempReqs(data);
            }
            // if (res.ok) {
            // if (data && data.length) {
            // let index = 0;
            //  const allRequest = data?.map(item => {
            //    return {
            //     key: index + 1,
            //     family: item.family,
            //     name: item.name,
            //     meliCode: item.meliCode,
            //    rahgiry: item.rahgiry,
            //   darkhast: item.darkhast,
            //   pasokh: item.pasokh,
            //   date: item.date,
            //  answerd: item.answerd

            //}
            //  })
            //setUsers(allRequest);
            // }
            // } else {
            //   console.log('The Error is: ', res.statusText)
            // }
        };
        getRequests();
    }, []);



    // const resToReq = async (meliCode, rahgiry) => {
    //     const res = await fetch(`/api/dashboard/Req/visitReq/${meliCode}/${rahgiry}`);
    //     const data = await res.json()
    //     if (res.ok) {

    //         if (data && data.responseItem && data.responseItem.length) {

    //             //setResItem(data.responseItem)
    //             // setTimeout(()=> {
    //             //     setResItem(data.responseItem)
    //             // }, 10)

    //             //setTimeout(()=> {console.log('resItem: ', resItem)}, 2000)
    //             swal({
    //                 title: "لطفا پاسخ مورد نظر را وارد کنید:",

    //                 text: "درخواست: " + data.responseItem[0]?.darkhast,
    //                 content: {
    //                     element: "input",
    //                     attributes: {
    //                         placeholder: "پاسخ ",

    //                     },
    //                 },

    //                 buttons: "ثبت پاسخ",

    //             })
    //                 .then(async (answerText) => {
    //                     if (answerText) {
    //                         const answer = {

    //                             pasokh: answerText,
    //                             rahgiry,
    //                             meliCode

    //                         };
    //                         console.log(answer)
    //                         const res = await fetch(`/api/dashboard/Res`, {
    //                             method: "PUT",
    //                             headers: {
    //                                 "Content-Type": "application/json",
    //                             },
    //                             body: JSON.stringify(answer),
    //                         });

    //                         if (res.status === 201) {
    //                             swal({
    //                                 title: "پاسخ مورد نظر ثبت شد",
    //                                 icon: "success",
    //                                 buttons: "فهمیدم",
    //                             });
    //                         }
    //                     }
    //                 });
    //         } else {
    //             setResItem(false)
    //         }
    //     } else {
    //         console.log('Res is not ok')
    //         setResItem(false)
    //     }


    // }

    function searchReqByFamily() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInputFamily");
        filter = input?.value.toUpperCase();
        table = document?.getElementById("myTable");
        tr = table?.getElementsByTagName("tr");
        for (i = 0; i < tr?.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                console.log(td)
                txtValue = td.textContent || td.innerText;
                console.log(td.textContent)
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    function searchReqByName() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInputName");
        filter = input?.value.toUpperCase();
        table = document?.getElementById("myTable");
        tr = table?.getElementsByTagName("tr");
        for (i = 0; i < tr?.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                console.log(td)
                txtValue = td.textContent || td.innerText;
                console.log(td.textContent)
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    function searchReqByMeliCode() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInputMeliCode");
        filter = input?.value.toUpperCase();
        table = document?.getElementById("myTable");
        tr = table?.getElementsByTagName("tr");
        for (i = 0; i < tr?.length; i++) {
            td = tr[i].getElementsByTagName("td")[3];
            if (td) {
                console.log(td)
                txtValue = td.textContent || td.innerText;
                console.log(td.textContent)
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    function searchReqByRahgiry() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInputRahgiry");
        filter = input?.value.toUpperCase();
        table = document?.getElementById("myTable");
        tr = table?.getElementsByTagName("tr");
        for (i = 0; i < tr?.length; i++) {
            td = tr[i].getElementsByTagName("td")[4];
            if (td) {
                console.log(td)
                txtValue = td.textContent || td.innerText;
                console.log(td.textContent)
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }


    const statusReq = async (status) => {
        console.log("Log==>", tempReqs, status)
        let filterData = [];
        if (status == true) {
            console.log("answer"),
                filterData = tempReqs.filter(item => item.answerd)
        } else if (status == false) {
            console.log("not answer"),
                filterData = tempReqs.filter(item => !item.answerd)
        }
        if (status == "TF") {
            console.log("all"),
                filterData = tempReqs
        }
        // const filterData = tempReqs.filter(item => {
        //     switch (status) {
        //         case true:
        //             console.log("answer"),
        //             item.answerd;
        //         case false:
        //             console.log("not answer"),
        //             !item.answerd;
        //     }
        // })
        console.log("LogfilterData==>", filterData)
        setAllReqs(filterData)

    }


    const visitReq = async (meliCode, rahgiry) => {
        const res = await fetch(`/api/dashboard/Req/visitReq/${meliCode}/${rahgiry}`);
        const data = await res.json()
        if (res.ok) {
            if (data && data.responseItem && data.responseItem.length) {
                setmeliCode(meliCode);
                setRahgiry(rahgiry)
                setReq(data.responseItem[0]?.darkhast);
                if (data.responseItem[0]?.pasokh) {
                    setResItem(data.responseItem[0]?.pasokh)
                } else {
                    setResItem("پاسخ داده نشده است");

                }
            }
        }
    }

    const resToRequest = async (meliCode, rahgiry) => {
        const res = await fetch(`/api/dashboard/Req/visitReq/${meliCode}/${rahgiry}`);
        const data = await res.json()
        if (res.ok) {
            if (data && data.responseItem && data.responseItem.length) {
                setmeliCode(meliCode);
                setRahgiry(rahgiry)
                setReq(data.responseItem[0]?.darkhast);
                if (data.responseItem[0]?.darkhast) {
                    const answerToReq = {

                        pasokh: resItem,
                        rahgiry,
                        meliCode
                    };
                    setAnswer(answerToReq)
                } else {
                    console.log('Res is not ok resToRequest')
                }
            }
        }
    }
    const saveRes = async () => {
        const res = await fetch(`/api/dashboard/Res/${meliCode}/${rahgiry}/${resItem}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(answer),
        });
        console.log("answer", resItem)
        if (res.ok) {
            console.log('Res is  ok saveRes')
        } else {
            console.log('Res is not ok')
        }
    }

    return (
        <>
            <main className=" h-screen w-screen flex-col  justify-between p-4 bg-blue-600 grid grid-cols-1 gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 ">
                <section className="col-span-5 lg:col-span-3 bg-blue-500 bg-opacity-20  lg:h-full h-auto  p-4 rounded-lg ">

                    <div className="w-full text-right items-start justify-start py-2  grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-2">
                        <Input classNames=" text-right items-start justify-start   col-span-1 w-full"
                            type="text"
                            label=""
                            placeholder="جستجوی نام خانوادگی"
                            labelPlacement="inside"
                            id="myInputFamily"
                            onChange={() => searchReqByFamily()}
                        />
                        <Input classNames=" text-right items-start justify-start   col-span-1 w-full"
                            type="text"
                            label=""
                            placeholder="جستجوی نام "

                            labelPlacement="inside"
                            id="myInputName"
                            onChange={() => searchReqByName()}
                        />
                        <Input classNames=" text-right items-start justify-start    col-span-1 w-full"
                            type="text"
                            label=""
                            placeholder="جستجوی کد ملی "

                            labelPlacement="inside"
                            id="myInputMeliCode"
                            onChange={() => searchReqByMeliCode()}
                        />
                        <Input classNames=" text-right items-start justify-start    col-span-1 w-full"
                            type="text"
                            label=""
                            placeholder="جستجوی کد  رهگیری"

                            labelPlacement="inside"
                            id="myInputRahgiry"
                            onChange={() => searchReqByRahgiry()}
                        />
                        <Dropdown >
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize bg-white"
                                >
                                    {selectedValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Multiple selection example"
                                variant="flat"
                                closeOnSelect={false}
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys}
                            >
                                <DropdownItem key="پاسخ داده شده" onClick={() => {
                                    statusReq(true);


                                }}>پاسخ داده شده</DropdownItem>
                                <DropdownItem key="پاسخ داده نشده" onClick={() => {
                                    statusReq(false);


                                }}> پاسخ داده نشده</DropdownItem>
                                <DropdownItem key="همه موارد" onClick={() => {
                                    statusReq("TF");


                                }}>همه موارد</DropdownItem>


                            </DropdownMenu>
                        </Dropdown>


                    </div>



                    <div>

                        <div className="w-full text-right items-start justify-start " >
                            <table className={styles.table} id="myTable">
                                <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>نام خانوادگی</th>
                                        <th>نام</th>
                                        <th>کد ملی</th>
                                        <th>کد رهگیری</th>
                                        <th>درخواست</th>
                                        <th>پاسخ</th>
                                        <th>وضعیت</th>
                                        <th>تاریخ درخواست</th>
                                        <th>تاریخ پاسخ</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reqs?.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.family}</td>
                                            <td>{item.name}</td>
                                            <td>{item.meliCode}</td>
                                            <td>{item.rahgiry}</td>
                                            <td>{item.darkhast.substr(0, 10) + "..."}</td>
                                            <td >{item.pasokh.substr(0, 10) + "..."
                                            }</td>
                                            <td>{item.status}</td>
                                            <td>{item.date}</td>
                                            <td>{item.dateSabt}</td>
                                            <td>
                                                <Button type="button" onClick={() => {
                                                    setisVisit("true");
                                                    visitReq(item.meliCode, item.rahgiry)
                                                    onOpen()
                                                }} className={styles.edit_btn}>
                                                    مشاهده
                                                </Button>
                                                <Button onClick={() => {
                                                    setisVisit(false);
                                                    resToRequest(item.meliCode, item.rahgiry)
                                                    onOpen()
                                                }
                                                } className={styles.edit_btn}>ثبت پاسخ</Button>
                                            </td>


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center   py-2">
                            <span className="text-default-800 text-medium bg-white">تعداد کل درخواست‌ها: {reqs.length} </span>
                            <label className="flex items-center text-default-800 text-medium bg-white">
                                تعداد سطر در صفحه:
                                <select
                                    className="bg-white outline-none text-default-800 text-medium"
                                    onChange={onRowsPerPageChange}
                                >
                                    <option value="5" >5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-full text-left items-start justify-start py-4  grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-2">
                            <Pagination
                             showControls 
                             total={pages} 
                             page={page}
                             initialPage={1} 
                             onChange={setPage}  
                             bottomContent={bottomContent}
                             />
                        </div>
                    </div>
                    <div>
                        {isVisit ? (<>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">مشاهده وضعیت درخواست </ModalHeader>
                                            <ModalBody className="w-full flex  ">
                                                <div className="space-y-2 mt-2 ">

                                                    <div className="w-full flex  "  >
                                                        <Textarea
                                                            type="text"

                                                            required
                                                            isRequired
                                                            label="درخواست"
                                                            labelPlacement="outside"
                                                            readOnly="true"
                                                            // className="max-w-xs"
                                                            value={req}
                                                        //onValueChange={setMeliCode}
                                                        />
                                                    </div>

                                                    <div className="w-full flex">
                                                        <Textarea
                                                            type="text"
                                                            placeholder="پاسخ"
                                                            required
                                                            isRequired
                                                            labelPlacement="outside"
                                                            readOnly="true"
                                                            value={resItem}
                                                            // className="max-w-xs"
                                                            // value={meliCode}
                                                            onValueChange={setResItem}
                                                        />
                                                    </div>

                                                </div>
                                            </ModalBody>
                                            <ModalFooter>


                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    بازگشت
                                                </Button>

                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </>) : (<>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>

                                            <ModalHeader className="flex flex-col gap-1">ثبت پاسخ</ModalHeader>
                                            <ModalBody className="w-full flex  ">
                                                <div className="space-y-2 mt-2 ">

                                                    <div className="w-full flex  "  >
                                                        <Textarea
                                                            type="text"

                                                            required
                                                            isRequired
                                                            label="درخواست"
                                                            labelPlacement="outside"
                                                            readOnly="true"
                                                            // className="max-w-xs"
                                                            value={req}
                                                        //onValueChange={setMeliCode}
                                                        />
                                                    </div>

                                                    <div className="w-full flex">
                                                        <Textarea
                                                            type="text"
                                                            placeholder="پاسخ"
                                                            required
                                                            isRequired
                                                            labelPlacement="outside"

                                                            // className="max-w-xs"
                                                            // value={meliCode}
                                                            onValueChange={setResItem}
                                                        />
                                                    </div>

                                                </div>
                                            </ModalBody>
                                            <ModalFooter>

                                                <Button color="primary" onClick={() => saveRes()}>
                                                    ثبت
                                                </Button>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    بازگشت
                                                </Button>

                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </>)}


                    </div>
                </section>
            </main>

        </>
    );


}