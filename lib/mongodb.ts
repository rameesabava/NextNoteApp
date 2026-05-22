import mongoose from "mongoose"

const connectionString = process.env.DB_CONNECTION_URL as string

export const connectDB = async ()=>{
    try{
        const res = await mongoose.connect(connectionString)
        console.log("DB connection successfull!!!!");
        
    }catch(err){
        console.log("DB connection failed....");
        console.log(err);
    }
}
