import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <>
    <nav>
    <Link to="/">
      <div>
        <img
          src="../src/assets/github-mark-white.svg"
          alt="Github-logo"
        />
      </div>
      </Link>
      <div>
        <Link to="/repo/create"><p>Create a Repository</p></Link>
        <Link to="/profile"><p>Profile</p></Link>
      </div>
      </nav>
    </>
  );
}
