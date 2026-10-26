import React from 'react'
import { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Navigate, useNavigate } from 'react-router-dom';
import { TiPlus } from "react-icons/ti";


function Upload () {
    const navigate = useNavigate();
    const [uploadType, setUploadType] = useState("post")
  return (
    // BACK BTN
    <div className='w-full h-[100vh]  bg-black flex flex-col items-center'>
        <div className='w-full h-[80px] flex items-center gap-[20px] px-[20px]'>
            <IoMdArrowRoundBack className='text-white cursor-pointer w-[25px] h-[25px]' onClick={() => navigate(`/`)} />
            <h1 className='text-white text-[20px] font-semibold'>Upload media</h1>
        </div>

        // POST, STOY, LOOP
        <div className='w-[90%] max-w-[600px] h-[80px] bg-white rounded-full flex justify-around items-center gap-[10px]'>
            <div className={`${uploadType === "post" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("post")}>Post</div>
            <div className={`${uploadType === "story" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("story")}>Story</div>
            <div className={`${uploadType === "loop" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("loop")}>Loop</div>
        </div>

        //Upload
        <div className='w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]'>
            <div onClick={()=>navigate("/upload")}><TiPlus className="text-white w-[28px] h-[28px] cursor-pointer"/></div>
            <div className='text-white text-[19px] font-semibold'>Upload {uploadType}</div>
        </div>

    </div>
  )
}

export default Upload 