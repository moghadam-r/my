import React from "react";
const columns = [
  {name: "ردیف", uid: "id", sortable: true},
  {name: "نام خانوادگی", uid: "family", sortable: true},
  {name: "نام", uid: "name", sortable: true},
  {name: "کد ملی", uid: "meliCode", sortable: true},
  {name:"کد رهگیری", uid: "rahgiry"},
  {name: "درخواست", uid: "darkhast"},

  {name: "پاسخ", uid: "pasokh"},
  {name: "تاریخ", uid: "date"},
  {name: "وضعیت", uid: "answerd"},
  {name: "عملیات", uid: "actions"},
];

const statusOptions = [
  {name: "ناقص", uid: "answerd"},
  {name: "تکمیل", uid: "no answerd"},
  
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    family: "CEO",
    meliCode: "Management",
    answerd: "active",
    date: "29",
    darkhast: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    pasokh: "tony.reichert@example.com",
  },
  
];

export {columns, users, statusOptions};
