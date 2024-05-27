import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./style_signin.scss";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setError("");
          setEmail("");
          setPassword("");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setError("Error: Couldn't find your account");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={login} className="signin_form">
        <h3 className="sign_in">SIGN IN</h3>
        <input
          type="email"
          className="signin_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <input
          type="password"
          className="signin_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        
        {error && <div className="signin_error">{error}</div>}
        <button type="submit" className="signin_button">
          login
        </button>
      </form>
      <div className="login_box">
        <a href="/signup" className="signin_link">
          Create New account
        </a>
      </div>
    </div>
  );
};

export default Signin;
