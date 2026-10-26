import sendMail from "../config/Mail.js";
import genToken from "../config/token.js";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";

 export const signUp = async (req, res)=>{
    try {
        const {name, username, email, password} = req.body;

        const findByEmail = await user.findOne({email});
        if(findByEmail){
            return res.status(400).json({
                message: "Email already exist !"
            })
        }

        const findByuserName = await user.findOne({username});
        if(findByuserName){
            return res.status(400).json({
                message: "UserName already exist !"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message: "password must be 6 characters"
            })
        }
        const hashedPassword =  await bcrypt.hash(password, 10);
        //create user
        const User = await user.create({
            name,
            username,
            email,
            password: hashedPassword
        })
        //create token
        const token = await genToken(User._id);

        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 10*365*24*60*60*1000,
            secure: false,
            sameSite: "Strict"
        })

        return res.status(201).json(User);

    } catch (error) {
        return res.status(500).json({
            message: `signUp error ${error}`
        })
    }
}

export const signIn = async (req, res)=>{
    try {
        const {username, password} = req.body;
        const User = await user.findOne({username});

        if(!User){
            return res.status(400).json({
                message: "User Not found"
            })
        }
        //matchPassword
        const isMatch = await bcrypt.compare(password,User.password);
        if(!isMatch){
            return res.status(400).json({
                message: "password is incorrect"
            })
        }

        const token = genToken(User._id);
        res.cookie("token", token,{
            httpOnly: true,
            maxAge: 10*365*24*60*60*1000,
            secure: false,
            sameSite: "Strict"
        })
        return res.status(200).json(User);

    } catch (error) {
        return res.status(500).json({
            message: `signIn erorr ${error}`
        })
    } 
}

export const signOut = async (req, res)=>{
    try {
        res.clearCookie("token")
        
        return res.status(200).json({
            message: "sign Out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Sign Out Error"
        })
    }
}

// SEND GENERATED OTP AND EMAIL TO SEND OTP
export const sendOtp = async (req, res)=>{
    try {
        const {email} = req.body;
        const User = await user.findOne({email});
        if(!User){
            return res.status(400).json({
                message: "User not found"
            })
        }

        const otp = Math.floor(1000 + Math.random()*9000).toString();
        User.resetOtp = otp;
        User.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        User.isOtpVerified = false;
        
        await User.save();
        await sendMail(email, otp);

        return res.status(200).json({
            message: "email successfully send"
        })
    }catch (error) {
        return res.status(500).json({
            message: `Send Otp Error ${error}`
        })
    }
}

//verify OTP
export const verifyOtp = async (req, res) =>{
    try {
        const {email, otp} = req.body;
        const User = await user.findOne({email});

        if(!User){
            return res.status(404).json({
                message: "User Not found"
            })
        }
    
        if(!User.resetOtp || String(User.resetOtp) !== String(otp) || User.otpExpires <= Date.now()){
            console.log("OTP received:", otp);
            console.log("OTP stored:", User.resetOtp);
            console.log("Expiry:", User.otpExpires);
            console.log("Current time:", new Date());
            return res.status(400).json({
                message: "Invalid OTP"
            })
        }
    
        User.isOtpVerified = true;
        User.resetOtp = "";
        User.otpExpires = null;
    
        await User.save();
        return res.status(200).json({
            message: "OTP verified Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:`verify OTP Error ${error}`
        })
    }
}

//RESET PASSWORD
export const restPassword = async (req, res)=>{
    try {
        const {email, password} = req.body;
        
        const User = await user.findOne({email});
        if(!User || !User.isOtpVerified){
            return res.status(404).json({
                message: "User not found / OTP Verification Requied"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        User.password = hashedPassword;

        User.isOtpVerified = false;
        User.isOtpVerified = false;
        User.resetOtp = "";
        User.otpExpires = null;

        await User.save();
        return res.status(200).json({
            message: "Password is reset Sucessfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: `Reset password Error ${error}`
        })
    }
}