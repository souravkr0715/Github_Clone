
import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { useState } from "react";

import { PageHeader } from "@primer/react";
import { Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { useNavigate } from "react-router-dom";

export default function Login() {

 const navigate = useNavigate();
// useEffect(()=>{
// 
// });

const [email,setEmail] = useState('');
const [password , setPassword] = useState('');
const[loading , setLoading] = useState(false);
const {currentUser ,setCurrentUser}=useAuth();



const handleLogin = async(e)=>{
  e.preventDefault();

  try{
    setLoading(true);
    const res = await axios.post("http://localhost:3000/Login",{
      email:email,
      password:password,
    })

    localStorage.setItem("token",res.data.token);
    localStorage.setItem("userId",res.data.userId);

    setCurrentUser(res.data.userId);
    setLoading(false);

   
    navigate("/");

  }catch (err) {
      console.error(err);
      alert("Login Failed");
      setLoading(false);
    }
}


   return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <div sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Login</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </div>
        </div>

     

          {/* Email */}
          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
           {loading ? "Loading..." : "Login"}
           
          </Button>

           {/* Footer */}
          <div className="pass-box">
            <p>
             Don't have an account ? <a  href = "/signup">Sign up</a>
            </p>
          </div>
        </div>
       
      </div>
  );
}
