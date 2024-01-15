import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex gap-7">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          {currentUser ? (
            <Link to='/profile'>
              <img src={currentUser.profilePicture} alt="User Profile" 
              className="h-7 w-7 rounded-full object-cover"/>
            </Link>
              
          ) : (
            <>
              <Link to="/signin">SignIn</Link> 
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
