import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState();
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + selectedFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, profilePicture: downloadURL });
          });
        }
      );
    }
  };
  const  handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})

  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    axios.put(`${process.env.REACT_APP_API_USER}/update/${currentUser.id}`,{
      username:formData.username,
      email:formData.email,
      profilePicture:formData.profilePicture
    },{withCredentials:true})
    .then(res=>{
      console.log(res.data);
      dispatch({
        type:'UPDATE',
        payload:{
          id:res.data._id,
          username:res.data.username,
          email:res.data.email,
          profilePicture:res.data.profilePicture
        }
      })
      alert('Update Success')
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const handleDeleteAccount =(e)=>{
    try {
      axios.delete(`${process.env.REACT_APP_API_USER}/delete/${currentUser.id}`,{withCredentials:true})
      .then(res=>{
        dispatch({
          type:"DELETE",
          payload:null
        })
      })
    } catch (err) {
      console.log(err);
    }
  }
  const handleLogoutAccount=()=>{
    axios.get(`${process.env.REACT_APP_API_AUTH}/logout/`,{withCredentials:true})
    .then(res=>{
      dispatch({
        type:"LOGOUT",
        payload:null
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleChangeFile}
        />
         <img
          src={formData.profilePicture || currentUser.photo}
          alt="profile"
          className="h-24 w-24  self-center cursor-pointer rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">
              {'Uploading: '}{imagePercent} %
            </span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
       

        <input
          type="text"
          defaultValue={currentUser.username}
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 mt-2"
          onChange={handleChange}
        />

        <input
          type="text"
          defaultValue={currentUser.email}
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 mt-2"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 mt-2"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80"
        >
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>Delete Account</span>
        <span className="text-red-700 cursor-pointer"onClick={handleLogoutAccount}>Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
