import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { TiPlus } from "react-icons/ti";
import dp from "../assets/dp.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



function Nav() {
  const navigate = useNavigate();
  const {userData} = useSelector(state=>state.user)
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] left-1/2 -translate-x-1/2 rounded-full shadow-2xl shadow-[#000000] z-[100]'>
        {/* HOME */}
        <div onClick={()=>navigate("/")}><AiFillHome className="text-white w-[25px] h-[25px] cursor-pointer" /></div>
        {/* SEARCH */}
        <div><FaSearch className="text-white w-[25px] h-[25px] cursor-pointer"/></div>
        {/* PLUS */}
        <div onClick={()=>navigate("/upload")}><TiPlus className="text-white w-[28px] h-[28px] cursor-pointer"/></div>
        {/* VIDEO */}
        <div><RxVideo className="text-white w-[30px] h-[30px] cursor-pointer"/></div>
        {/* PROFILE */}
        <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${userData.username}`)}>
            <img src={userData.profileImage || dp} alt="" className='w-full h-full object-cover' />
        </div>

    </div>
  )
}

export default Nav