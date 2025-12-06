import mongoose from "mongoose";
export const connectToDB=async ()=>{
    return await mongoose.connect(`${process.env.MONGO_URI}`)
}