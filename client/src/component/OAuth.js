import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'


const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      axios
        .post(`${process.env.REACT_APP_API_AUTH}/google`, {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },{withCredentials:true})
        .then((res) => {
          dispatch({
            type:'LOGIN',
            payload:{
              id:res.data._id,
              username:res.data.username,
              email:res.data.email,
              photo:res.data.profilePicture
            }
          });
          navigate('/')
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
};

export default OAuth;
