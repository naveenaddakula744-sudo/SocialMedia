import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import axios from "axios"
import { serverUrl } from '../App'
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";

function ForgotPassword() {
    const [step, setStep] = useState(1)

    const [inputClicked, setInputClicked] = useState({
      email: false,
      otp: false,
      newPassword: false,
      confirmNewPassword: false
    })

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [confirmNewPassword, setconfirmNewPassword] = useState("")
    const [err, setErr] = useState("");
    const[loading,setLoading] = useState(false)

     {/* STEP-1  Enter Email */}
    const handleStep1 = async ()=>{
      setLoading(true);
      setErr("");
      try {
        const result = await axios.post(`${serverUrl}/api/auth/sendOtp`, {email}, {withCredentials: true});
        console.log(result.data);
        
        setStep(2)
      } catch (error) {
        setErr(error.response?.data?.message)
        console.log(error);
        
      } finally{
        setLoading(false);
      }
    }
    {/* STEP-2  Enter Your OTP*/}
    const handleStep2 = async ()=>{
      setLoading(true);
      setErr("")
      try {
        const result = await axios.post(`${serverUrl}/api/auth/verifyOtp`, {email, otp}, {withCredentials: true});
        console.log(result.data);
        
        setStep(3)
      } catch (error) {
        setErr(error.response?.data?.message)
        console.log(error);
        
      } finally{
        setLoading(false);
      }
    }
    {/* STEP-3 NEW_PASSWORD */}
    const handleStep3 = async ()=>{
      if(newPassword !== confirmNewPassword){
        return setErr("Password does not match")
      }
      setLoading(true);
      setErr("")
      try {
        const result = await axios.post(`${serverUrl}/api/auth/restPassword`, {email, password:newPassword}, {withCredentials: true});
        console.log(result.data);
        
      } catch (error) {
        setErr(error.response?.data?.message)
        console.log(error);

      } finally{
        setLoading(false)
      }
    }

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
          {/* STEP-1  Enter Email */}
          {step == 1 && (<div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border border-[#1a1f23]'>
            <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
            {/* EMAIL */}
            <div className='relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({...inputClicked, email: true })}>
              <label
                htmlFor='email' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? 'top-[-15px]' : ''}`}>
                Enter Your Email
              </label>
              <input type='email' id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>

            {err && <p className='text-red-500'>{err}</p>}

            {/* BUTTON */}
            <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' disabled={loading} onClick={handleStep1}>{loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}</button>
            </div>
          )}

          {/* STEP-2  Enter Your OTP*/}
          {step == 2 && (<div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border border-[#1a1f23]'>
            <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
            {/* EMAIL */}
            <div className='relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({...inputClicked, otp: true })}>
              <label
                htmlFor='otp' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp ? 'top-[-15px]' : ''}`}>
                Enter Your OTP
              </label>
              <input type='text' id='otp' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e) => setOtp(e.target.value)} value={otp}/>
            </div>

            {err && <p className='text-red-500'>{err}</p>}

            {/* BUTTON */}
            <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' disabled={loading} onClick={handleStep2}>{loading ? <ClipLoader size={30} color="white" /> : "Submit"}</button>
            </div>
          )}

          {/* STEP-3 NEW_PASSWORD  && CONFIM-PASSWORD*/}
          {step == 3 && (<div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border border-[#1a1f23]'>
            <h2 className='text-[30px] font-semibold'>Reset Password</h2>

            {/* NEW_PASSWORD */}
            <div className='relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({...inputClicked, newPassword: true })}>
              <label htmlFor='newPassword' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword ? 'top-[-15px]' : ''}`}>
                Enter NewPassword
              </label>
              <input type={showNewPassword ? "text" : "password"} id='newPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] pr-[55px] outline-none border-0' required onChange={(e) => setnewPassword(e.target.value)} value={newPassword}/>
              {!showNewPassword ? <RxEyeOpen className="absolute cursor-pointer right-[20px] top-1/2 -translate-y-1/2 w-[25px] h-[25px]" onClick={() => setShowNewPassword(true)} /> : <RxEyeClosed className="absolute cursor-pointer right-[20px] top-1/2 -translate-y-1/2 w-[25px] h-[25px]" onClick={() => setShowNewPassword(false)} />}
            </div>

            {/* CONFIRM-PASSWORD */}
            <div className='relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({...inputClicked, confirmNewPassword: true })}>
              <label htmlFor='confirmNewPassword' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.confirmNewPassword ? 'top-[-15px]' : ''}`}>
                Confirm Password.
              </label>
              <input type={showConfirmPassword ? "text" : "password"} id='confirmNewPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] pr-[55px] outline-none border-0' required onChange={(e) => setconfirmNewPassword(e.target.value)} value={confirmNewPassword}/>
              {!showConfirmPassword ? <RxEyeOpen className="absolute cursor-pointer right-[20px] top-1/2 -translate-y-1/2 w-[25px] h-[25px]" onClick={() => setShowConfirmPassword(true)} /> : <RxEyeClosed className="absolute cursor-pointer right-[20px] top-1/2 -translate-y-1/2 w-[25px] h-[25px]" onClick={() => setShowConfirmPassword(false)} />}
            </div>

            {err && <p className='text-red-500'>{err}</p>}

            {/* BUTTON */}
            <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' disabled={loading} onClick={handleStep3}>{loading ? <ClipLoader size={30} color="white" /> : "Reset Password"}</button>
            </div>
          )}
        </div>
    )
}

export default ForgotPassword;