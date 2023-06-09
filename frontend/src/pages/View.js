import React, { useState,useEffect } from 'react'
import './View.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const View = () => {
    const [user,setUser]=useState([]);
    const {id}=useParams();
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/get/${id}`)
          .then((resp) => setUser({ ...resp.data[0] }));
      }, [id]);
  return (
    <div style={{marginTop:"150px"}}>
      <div className='card'>
        <div className='card-header'>
           <p>Employee Details</p> 
        </div>
        <div className='container'>
            <strong>ID:</strong>
            <span>{id}</span>
            <br/><br/>
            <strong>Name:</strong>
            <span>{user.name}</span>
            <br/><br/>
            <strong>Job Title:</strong>
            <span>{user.title}</span>
            <br/><br/>
            <strong>Phone number:</strong>
            <span>{user.phone}</span>
            <br/><br/>
            <strong>Email:</strong>
            <span>{user.email}</span>
            <br/><br/>
            <strong>Address:</strong>
            <span>{user.address}</span>
            <br/><br/>
            <Link to="/">
            <div className='btn btn-edit'>Go Back</div>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default View
