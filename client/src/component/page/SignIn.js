import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin } from 'antd';
import { useDispatch } from "react-redux";
import OAuth from "../OAuth";


const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_AUTH}/login`, formData,{withCredentials:true})
      .then((res) => {
        dispatch({
          type:'LOGIN',
          payload:{
            id:res.data._id,
            username:res.data.username,
            email:res.data.email,
            profilePicture:res.data.profilePicture
          }
        })
        console.log(res.data);
        setLoading(false)
        navigate('/')

      })
      .catch((err) => {
        alert(err.response);
        setLoading(false)
      })
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {loading ? <Spin />:
        <button
        type="submit"
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        Sign In
      </button>
      }
      <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have a account?</p>
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Signin;
