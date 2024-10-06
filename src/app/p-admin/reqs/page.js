"use client"
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,

  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";

import { capitalize } from "./utils";

const statusColorMap = {
  T: "success",
  F: "danger",

};

const INITIAL_VISIBLE_COLUMNS = ["family", "name","darkhast", "rahgiry","pasokh", "status","actions"];

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState([]);
  const [tempReqs, setAllTempReqs] = useState([]);
  const [reqs, setAllReqs] = useState([]);
  const [req, setReq] = useState();
  const [resItem, setResItem] = useState();
  const [meliCode, setmeliCode] = useState();
  const [rahgiry, setRahgiry] = useState();
  const [answer, setAnswer] = useState([]);
  const [isVisit, setisVisit] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");


  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "raghiry",
    direction: "ascending",
  });
  // my code

  const columns = [

    { name: "نام خانوادگی", uid: "family", sortable: true },
    { name: "نام", uid: "name", sortable: true },
    { name: "کد ملی", uid: "meliCode", sortable: true },
    { name: "کد رهگیری", uid: "rahgiry" },
    { name: "درخواست", uid: "darkhast" },
    { name: "پاسخ", uid: "pasokh" },
    { name: "تاریخ درخواست", uid: "date" },
    { name: "تاریخ ثبت", uid: "dateSabt" },
    { name: "وضعیت", uid: "status" },
    { name: "عملیات", uid: "actions" },
    { name: "جواب", uid: "answerd" },
  ];

  const statusOptions = [
    { name: "پاسخ داده شده", uid: "T" },
    { name: "پاسخ داده نشده", uid: "F" },

  ];
  
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join("* ").replaceAll("_", " "),
    [selectedKeys]
  );


  useEffect(() => {
    const getRequests = async () => {
      const res = await fetch("/api/dashboard/Req/getAll");
      //window.alert(res.statusText)
      const data = await res.json();
      console.log("data====>", data)
      // if (res.ok) {
      if (data && data.length) {
        //let index = 0;
        const allRequest = data?.map(item => {
          return {
            key: item._id,
            family: item.family,
            name: item.name,
            meliCode: item.meliCode,
            rahgiry: item.rahgiry,
            darkhast: item.darkhast.length > 10 ? (item.darkhast.substr(0, 10) + "..."):(item.darkhast),
            pasokh: item.pasokh.length > 10 ? (item.pasokh.substr(0, 10) + "..."):(item.pasokh),
            date: item.date,
            dateSabt: item.dateSabt,
            status: item.status,
            answerd: item.answerd,


          }
        })
        setUsers(allRequest);
      }
      // } else {
      //   console.log('The Error is: ', res.statusText)
      // }
    };
    getRequests();
  }, []);

  function searchReqByFamily() {
    console.log("reza")
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

  const 
  
  resToRequest = async (meliCode, rahgiry) => {
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
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    // console.log("filteredUsers=====>", users);

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {

      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.answerd),

      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    
    switch (columnKey) {
      case "family":
        return (
          <div className="flex flex-col">

            <p className="text-bold text-tiny capitalize text-default-500">{user.family}</p>
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col">

            <p className="text-bold text-tiny capitalize text-default-500">{user.name}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.answerd]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => {
                  setisVisit("true");
                  console.log("reza,",user);
                  visitReq(user.meliCode, user.rahgiry)
                  onOpen()
                }}>مشاهده</DropdownItem>
                <DropdownItem onClick={() => {
                  setisVisit(false);
                 resToRequest(user.meliCode, user.rahgiry)
                  onOpen()
                }
                }>ثبت پاسخ</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      
        <div className="flex justify-between gap-3 items-end mr-2 flex-row-reverse">
          
          <div className="flex gap-3 ml-2">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                 className="bg-blue-100"
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  وضعیت پاسخ
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown >
              <DropdownTrigger className="hidden sm:flex">
                <Button 
                className="bg-blue-100"
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  انتخاب ستون‌ها
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

          </div>
        </div>
       
      
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <>
      <div className="py-2 px-2 flex justify-between items-center bg-blue-100 flex rounded-md text-black">
          <span className=" text-small text-black">تعداد کل درخواست‌ها: {users.length} </span>
          <label className="flex items-center text-black text-small">
            تعداد سطر در صفحه:
            <select
              className="bg-transparent outline-none text-black text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5" >5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
          <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background ",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        
        </div>
    
        
      
      </>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <>
      <main>
        <section className="col-span-5 lg:col-span-3 bg-gray-100 bg-opacity-20  lg:h-full h-auto  p-4 rounded-lg ">

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

          <Table
            isCompact
            removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
              classNames: {
                wrapper: "after:bg-foreground after:text-background text-background",
              },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
            className="bg-blue-50  rounded-md "
            id="myTable"
          >
            <TableHeader columns={headerColumns} >
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"درخواستی یافت نشد"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id} >
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </main>
    </>
  );
}
