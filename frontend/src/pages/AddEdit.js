import React, { useEffect, useState } from "react";
import "./AddEdit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  title: "",
  phone: "",
  email: "",
  address: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, title, phone, email, address } = state;

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !phone || !email || !address) {
      toast.error("Please Provide value into each Input Fields");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            title,
            phone,
            email,
            address,
          })
          .then(() => {
            setState({
              name: "",
              title: "",
              phone: "",
              email: "",
              address: "",
            });
          })
          .catch((err) => {
            //console.log(err);
            toast.error(err.response.data);
          });
        toast.success("Employee Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            title,
            phone,
            email,
            address,
          })
          .then(() => {
            setState({
              name: "",
              title: "",
              phone: "",
              email: "",
              address: "",
            });
          })
          .catch((err) => {
            //console.log(err);
            toast.error(err.response.data);
          });
        toast.success("Employee Updated Successfully");
      }
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Employee name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter Employee Job Title"
          value={title || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="Enter Employee phone number"
          value={phone || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Employee email"
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter Employee address"
          value={address || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
