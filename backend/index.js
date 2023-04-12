const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const pagination = require("pagination");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Yash",
  database: "employee_db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const page = req.query.page? parseInt(req.query.page):1;
  const size = req.query.size? parseInt(req.query.size):10;
  const offset= (page - 1) * size;
  const sqlGet = "SELECT * FROM employeedb SIZE ? OFFSET ?";
  const values = [size,offset];
  db.query(sqlGet, values, (err, result) => {
    const paginator = new pagination.SearchPaginator({
      prelink: "/api/get",
      current: page,
      rowsPerPage:size,
      totalResult: result.length,
    });
    res.status(200).json({ employees: result, pagination: paginator.render() });
    res.send(result);
  });
});

app.get("/", (req, res) => {
  // const sqlInsert="INSERT INTO employeedb(name,title,phone,email,address) VALUES('Yash','Manager','8291257146','yashshah0408@gmail.com','204,Dahisar Vinayak Society,Dahisar(W)')";
  // //console.log(sqlInsert);
  // db.query(sqlInsert,(err,result)=>{
  //     console.log(err);
  //     console.log(result);
  //     res.send('Hello Express');
  // })
});

app.listen(5000, () => {
  console.log("Server running on PORT 5000");
});
