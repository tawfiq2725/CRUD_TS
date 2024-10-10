import express from "express";
import connection from "./config/config";


const app = express();
const PORT = 3000;
connection();


app.use(express.json())



app.listen(PORT,()=>{
    console.log(`server running on ${PORT} => http://localhost:${PORT}`)
})