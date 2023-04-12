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
  const sqlGet = "SELECT * FROM employeedb";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, title, phone, email, address } = req.body;
  const sqlInsert =
    "INSERT INTO employeedb(name,title,phone,email,address) VALUES(?,?,?,?,?)";
  db.query(sqlInsert, [name, title, phone, email, address], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM employeedb WHERE id=?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM employeedb WHERE id=?";
  db.query(sqlGet, id, (err, result) => {
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, title, phone, email, address } = req.body;
  const sqlUpdate =
    "UPDATE employeedb SET name=?,title=?,phone=?,email=?,address=? WHERE id=?";
  db.query(sqlUpdate, [name, title, phone, email, address, id], (err, result) => {
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
