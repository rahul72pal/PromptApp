import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB is Already Connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL,{

        })
        isConnected = true;

        console.log('MngoDB Connected');
    } catch (error) {
        console.log(error)
    }
}