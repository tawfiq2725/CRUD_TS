import express from "express";
import connection from "./config/config";
import path from "path"
import router from "./routes/routes";
import expressEjsLayouts from "express-ejs-layouts";
import methodOverride from "method-override"
import session from "express-session"
import crypto from "crypto";
const app = express();
const PORT = 3000;
connection();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));


const sessionSecret = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: sessionSecret, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(expressEjsLayouts)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');
app.set("layout","./layout")


app.use('/',router)

app.listen(PORT,()=>{
    console.log(`server running on ${PORT} => http://localhost:${PORT}`)
})