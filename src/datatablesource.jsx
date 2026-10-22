
export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "age",
    headerName: "Age",
    width: 90,
    type: "number",
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
  

export const userRows = [
  {
    id: 1,
    username: "mama abdu",
    img: "https://i.pravatar.cc/150?img=12",
    status: "active",
    email: "jonsnow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://i.pravatar.cc/150?img=13",
    status: "active",
    email: "jamie@gmail.com",
    age: 42,
  },
  {
    id: 3,
    username: "mahir ali",
    img: "https://i.pravatar.cc/150?img=44",
    status: "pending",
    email: "cersei@gmail.com",
    age: 45,
  },
  {
    id: 4,
    username: "Arya Stark",
    img: "https://i.pravatar.cc/150?img=47",
    status: "active",
    email: "arya@gmail.com",
    age: 16,
  },
  {
    id: 5,
    username: "Almaz Kebere",
    img: "https://i.pravatar.cc/150?img=49",
    status: "passive",
    email: "daenerys@gmail.com",
    age: 29,
  },
  {
    id: 6,
    username: "Abdi Mohammed",
    img: "https://i.pravatar.cc/150?img=45",
    status: "active",
    email: "melisandre@gmail.com",
    age: 150,
  },
  {
    id: 7,
    username: "Biniam Alemu",
    img: "https://i.pravatar.cc/150?img=11",
    status: "pending",
    email: "ferrara@gmail.com",
    age: 44,
  },
  {
    id: 8,
    username: "Rossini Frances",
    img: "https://i.pravatar.cc/150?img=14",
    status: "active",
    email: "rossini@gmail.com",
    age: 36,
  },
  {
    id: 9,
    username: "Nuru Ahmed",
    img: "https://i.pravatar.cc/150?img=16",
    status: "passive",
    email: "roxie@gmail.com",
    age: 65,
  },
];
