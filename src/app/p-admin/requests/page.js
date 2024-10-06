"use client"
import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";



const columns = [
   {
    key: "key",
     label: "ردیف ",
   },
  {
    key: "family",
    label: "نام خانوادگی",
  },
  {
    key: "name",
    label: "نام",
  },
  {
    key: "meliCode",
    label: "کد ملی",
  },
  {
    key: "rahgiry",
    label: "کد رهگیری",
  },
  {
    key: "darkhast",
    label: "درخواست",
  },
  {
    key: "pasokh",
    label: "پاسخ",
  },
  {
    key: "date",
    label: "تاریخ",
  },
  {
    key: "answerd",
    label: "وضعیت",
  },
  {
    key: "actions",
    label: "عملیات",
  },
];

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
  const [allReq, setAllReq] = React.useState([]);
  useEffect(() => {
    const getRequests = async () => {
      const res = await fetch("/api/dashboard/Req/getAll");
      //window.alert(res.statusText)
      const data = await res.json();
      console.log("data====>", data)
      if (res.ok) {
        if (data && data.length) {
          let index = 0;
          const allRequest = data?.map(item => {
            return {
               key:index+1,
              family: item.family,
              name: item.name,
              meliCode: item.meliCode,
              rahgiry: item.rahgiry,
              darkhast: item.darkhast,
              pasokh: item.pasokh,
              date: item.date,
              answerd: item.answerd ? "پاسخ داده شده":"پاسخ داده نشده",

            }
          })
          setAllReq(allRequest);
        }
      } else {
        console.log('The Error is: ', res.statusText)
      }
    };
    getRequests();
  }, []);
  return (
    <Table
      aria-label="Controlled table example with dynamic content"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={allReq}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


