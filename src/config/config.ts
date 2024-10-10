import mongoose from "mongoose";

const connection = async()=>{
    try {
        let url = `mongodb://localhost:27017/ts-crud`
        await mongoose.connect(url);
        console.log(`Mongo Db connected successfully...`);
    } catch (error) {
        console.log("An error occured" + error)
    }
}

export default connection;