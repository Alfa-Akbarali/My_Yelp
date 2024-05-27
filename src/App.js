import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import Home from './components/Home/Home';
import Signin from './components/signIn/signIn';
import Signup from './components/signOut/signOut';
import Error from './components/error/error';

function App() {
  const [isAuth, setisAuth] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setisAuth(true);
      } else {
        setisAuth(false);
      }
    });
  
    setIsLoading(false);
    return () => unsubscribe();
  }, []);

  if(isLoading){
    return <div>loading...</div>
  }

  return (
    <Routes>
      <Route path='*' element={<Error />}/>
      <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Signin />} />
      <Route path="/signup" element={isAuth ? <Navigate to="/" /> : <Signup />} />
    </Routes>
  );
}

export default App;