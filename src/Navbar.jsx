import React from "react";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "./CartSlice"; // Ensure this path matches your project structure
import "./Navbar.css";

const Navbar = () => {
  const totalQuantity = useSelector(selectTotalQuantity); // Use the selector to fetch total quantity

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>Paradise Nursery</h1>
      </div>
      <div className="navbar-right">
        <div className="cart-icon">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              height="40"
              width="40"
            >
              <circle cx="80" cy="216" r="12"></circle>
              <circle cx="184" cy="216" r="12"></circle>
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </span>
          <span className="cart-count">{totalQuantity}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;