//to connect to the database require mongoose
const mongoose = require("mongoose");

//connection function
const connectDB = async ()=> {
    try{
        //setting mongoose that remove the warning inside cli that we don't want
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected ${conn.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;