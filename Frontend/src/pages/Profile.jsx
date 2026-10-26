import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setprofileData, setUserData } from '../redux/userSlice';
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.png"
import Nav from "../components/Nav";

function profile() {
  const {username} = useParams();
  const dispatch = useDispatch();
  const {profileData, userData} = useSelector(state=>state.user)
  const navigate = useNavigate();

  const handleProfile = async ()=>{
    try {
      const result = await axios.get(`${serverUrl}/api/user/getProfile/${username}`, {withCredentials:true})
      dispatch(setprofileData(result.data))
    } catch (error) {
      
      console.log(error)
    }
  }

  const handleLogOut = async()=>{
      try {
        const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
        dispatch(setUserData(null));
      } catch (error) {
        console.log(error);
      }
  }


  useEffect(()=>{handleProfile()}, [username, dispatch]);
  return(
    <div className='w-full min-h-screen bg-black'>
      <div className='w-full h-[80px] flex justify-between items-center px-[30px] text-white'>
        {/* BACK-BTN */}
        <div className='cursor-pointer' onClick={()=>navigate("/")}><IoMdArrowRoundBack className='text-white w-[25px] h-[25px]'/></div>
        <div className='font-semibold text-[20px]'>{profileData?.username}</div>
        <div className='font-semibold cursor-pointer text-[20px] text-blue-500' onClick={handleLogOut}>Log Out</div>
      </div>

      <div className='w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center'>
        {/* PROFIL-IMAGE  */}
        <div className='w-[80px] h-[80px] md: w-[140px] h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
          <img src={profileData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
        </div>
        {/* NAME,PROFESSIOM, BIO */}
        <div>
          <div className='font-semibold text-[22px] text-white'>{profileData?.name}</div>
          <div className='text-[17px] text-[#ffffffa8]'>{profileData?.profession || "New User"}</div>
          <div className='text-[17px] text-[#ffffffa8]'>{profileData?.bio}</div>
        </div>
      </div>

      {/* POST,FOLLOWERS, FOLLOWING */}
      <div className='w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white'>
        <div>
          <div className='text-white text-[22px] md:text-[30px] font-semibold'>{profileData?.posts.length}</div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Posts</div>
        </div>
        {/* FOLLOWERS */}
        <div>
          <div className='flex items-center jestify-center gap-[20px]'>
            <div className='flex relative'>
                <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                  <img src={profileData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden absolute left-[9px]'>
                  <img src={profileData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden absolute left-[18px]'>
                  <img src={profileData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
                </div>
            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold'> {profileData?.followers.length}</div>
          </div>

          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Followers</div>
        </div>
          {/* FOLLOWING */}
        <div>
          <div className='flex items-center jestify-center gap-[20px]'>
            <div className='flex relative'>
              <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
              </div>
              <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden absolute left-[9px]'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
              </div>
              <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden absolute left-[18px]'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
              </div>
            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold'> {profileData?.following.length}</div>
          </div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Following</div>
        </div>
      </div>

      {/* EIDI PROFILE AND FOLLOW AND MESSAGE BTN */}
      <div className='w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]'> 
        {/* USER SHOW EDIT BTN */}
        { 
          profileData?._id == userData._id && <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl' onClick={()=>navigate("/editprofile")}>Edit Profile</button>
        }
        {/* OTHERS SHOW FOLLOW AND MESSAGE */}
        {
          profileData?._id != userData._id &&
          <>
            <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl'>Follow</button>
            <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl'>Message</button>
          </>
        }
      </div>

      {/* POSTS_SECTION */}
      <div className='w-full min-h-[100vh] flex justify-center'>
        <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]'>
           <Nav/>
        </div>
      </div>
    </div> 
  )
}

export default profile