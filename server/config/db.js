import mongoose from "mongoose";

// function to connect mongodb 
const connectDB = async () =>{

    mongoose.connection.on('connected' , () => console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB