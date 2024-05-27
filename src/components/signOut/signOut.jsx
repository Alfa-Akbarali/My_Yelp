import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import "./style_signout.scss";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: username,
        })
          .then(() => {
            console.log("User profile updated successfully");
          })
          .catch((error) => {
            setError("Error updating user profile", error);
          });
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            userName: username,
            email: email,
            uid: auth.currentUser.uid,
          });
        }
        setError("");
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Error: This email already exists");
      });
  };
  return (
    <div className="container">
      <form onSubmit={signup} className="signin_form">
        <h3 className="sign_in">Registration</h3>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="signin_input"
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signin_input"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signin_input"
        />

        <button type="submit" className="signin_button">
          Signup
        </button>
        {error && <div className="signin_error">{error}</div>}
      </form>

      <div className="login_box">
        <a href="/login" className="signin_link">
          Sign In
        </a>
      </div>
    </div>
  );
};

export default Signup;
