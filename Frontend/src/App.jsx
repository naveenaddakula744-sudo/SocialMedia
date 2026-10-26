import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import getCurrentUser from './hook/getCurrentUser';
export const serverUrl = "http://localhost:8000";
import { Navigate } from "react-router-dom";
import getSuggestedUsers from './hook/getSuggestedUsers';
import Profile from './pages/profile';
import EditProfile from './pages/EditProfile';
import Upload from './pages/Upload ';

function App() {
  getCurrentUser();
  getSuggestedUsers();
  const {userData} = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to={"/"} />} />
      <Route path="/signin" element={!userData ? <SignIn/> : <Navigate to={"/"} />}/>
      <Route path="/" element={userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path="/Forgot-Password" element={!userData ? <ForgotPassword/> : <Navigate to={"/"} />}/>
      <Route path="/profile/:username" element={userData ? <Profile /> : <Navigate to={"/signin"} />} />
      <Route path="/upload" element={userData ? <Upload /> : <Navigate to={"/signin"} />} />
      <Route path="/editProfile" element={userData ? <EditProfile /> : <Navigate to={"/signin"} />} />
    </Routes>
  )
}

export default App