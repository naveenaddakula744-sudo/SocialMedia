import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb connected succesfully");
    } catch (error) {
        console.log("Error accors at mongodb connecting time");
    }
}

export default connectDB;