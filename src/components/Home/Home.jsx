import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import icon_header from "./header_icon.svg";
import "./style_home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  const [isloading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Get the current user
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        const q = query(
          collection(db, "restaurants"),
          where("usersId", "==", user.uid)
        );
        const unsubscribeRestaurants = onSnapshot(q, (querySnapshot) => {
          setRestaurants(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setIsLoading(false); // Set loading state to false when data has been fetched
        });

        return () => unsubscribeRestaurants();
      }
    });
    setIsLoading(false);
    return () => unsubscribeAuth();
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  // Store the restaurant in the user's subcollection
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      await addDoc(collection(db, "restaurants"), {
        name: name,
        description: description,
        city: city,
        usersId: user.uid,
      });
    }
    navigate("/");
  };

  if (isloading) {
    return <h1 className="loading">loading...</h1>;
  }

  return (
    <div className="container_home">
      <div className="header">
        <img className="header_icon" src={icon_header} alt="img" />
        <button className="btn" onClick={handleLogout}>
          logout
        </button>
      </div>

      <div className="section">
        <form onSubmit={handleSubmit}>
          <h2 className="add_res">Add Restaurant</h2>
          <div className="section_box">
            <div className="form-input">
              <input
                type="text"
                placeholder="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-input">
              <input
                type="text"
                placeholder="description"
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="form-input">
              <input
                type="text"
                placeholder="city"
                id="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <label htmlFor="city">City</label>
            </div>
            <button className="btn_add" type="submit">
              Add to Table
            </button>
          </div>
        </form>
      </div>

      <div className="table_section">
        <table>
          <thead>
            <tr>
              <th className="table_header">#</th>
              <th className="table_header">Restaurant Name</th>
              <th className="table_header">Description</th>
              <th className="table_header">City</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.map(({ id, data }, index) => (
              <tr key={id}>
                <td className="table_data">{index + 1}</td>
                <td className="table_name">{data.name}</td>
                <td className="table_desc">{data.description}</td>
                <td className="table_city">{data.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
