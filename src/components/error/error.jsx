import React from "react";
import './Style_error.scss'
import exclamation from './exclamation.png';
const Error = () => {
  return (
    <div className="container">
        <img className="exclamation" src={exclamation} alt="img" />
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
};

export default Error;
