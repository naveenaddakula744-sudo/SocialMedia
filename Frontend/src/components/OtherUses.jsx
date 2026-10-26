import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.png"
import { useNavigate } from 'react-router-dom';


function OtherUses({user}) {
    const {userData} = useSelector(state=>state.user);
    const navigate = useNavigate();
  return (
    <div className='w-full h-[80px] flex items-center justify-between border-b-2 border-b-gray-900'>
        <div className='flex items-center gap-[10px]'>
            {/* PROFIL-IMAGE  */}
            <div className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${user.username}`)}>
                <img src={user.profileImage || dp} alt="" className='w-full h-full object-cover' />
            </div>
            {/* USERNAME AND NAME */}
            <div className='items-center gap-[10px]'>
                <div className='text-[18px] text-white font-semibold'>{user.username}</div>
                <div className='text-[15px] text-gray-400 font-semibold'>{user.name}</div>
            </div>
        </div>
        {/* FOLLOW - BUTTON */}
        <button className='w-[100px] h-[30px] px-[8px] py-[3px] bg-white rounded-2xl cursor-pointer'>Follow</button>
    </div>
  )
}

export default OtherUses