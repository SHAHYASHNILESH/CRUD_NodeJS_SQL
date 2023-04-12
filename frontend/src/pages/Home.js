import React, { useEffect, useState, useMemo } from "react";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
const LIMIT = 10;

const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for (let x = 1; x <= parseInt(total) / limit; x++) {
    pages.push(x);
  }

  return pages;
};

const Home = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useMemo(() => {
    //loadData();
    axios
      .get("http://localhost:5000/api/get", {
        params: {
          page: 1,
          size: LIMIT,
        },
      })
      .then(({ data }) => {
        setData(data.records);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [activePage]);
  return (
    <div style={{ marginTop: "150px" }}>
      <ul className="pagination">
        {activePage !== 1 && (
          <li
            className="page-item"
            onClick={() => setActivePage(activePage - 1)}
          >
            <a className="page-link" href="javascript:void(null)">
              Previous
            </a>
          </li>
        )}
        {totalPagesCalculator(totalUsers, LIMIT).map((page) => (
          <li
            className={`page-item ${activePage === page ? "active" : ""}`}
            key={page}
          >
            <a
              className="page-link"
              href="javascript:void(null)"
              onClick={() => setActivePage(page)}
            >
              {page}
            </a>
          </li>
        ))}
        {activePage !== totalPagesCalculator(totalUsers, LIMIT).length && (
          <li
            className="page-item"
            onClick={() => setActivePage(activePage + 1)}
          >
            <a className="page-link" href="javascript:void(null)">
              Next
            </a>
          </li>
        )}
      </ul>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Job Title</th>
            <th style={{ textAlign: "center" }}>Phone Number</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.title}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete">Delete</button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
