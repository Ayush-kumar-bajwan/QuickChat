import { useState } from "react";
import{ Navigate,Routes,Route} from "react-router-dom"
import "./App.css";
import Login from "./pages/Login/Login";
import SignUp from "./pages/signUp/SignUp";
import Home from "./pages/Home/Home";
import {Toaster} from "react-hot-toast"
import { useAuthContext } from "./context/AuthContext";
function App() {
  const {authUser} = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen flex justify-center items-center">
        <Toaster />
        <Routes>
          <Route path= "/" element={authUser? <Home /> : <Navigate to={"/login"} />}/>
          <Route path= "/signup" element={authUser ? <Navigate to={"/"}/> : <SignUp />}/>
          <Route path= "/login" element={authUser ? <Navigate to = {"/"} /> : <Login />}/>
        </Routes>
        
        
        
      </div>
    </>
  );
}

export default App;
