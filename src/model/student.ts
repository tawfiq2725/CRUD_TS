import mongoose,{Schema,Document} from "mongoose";

// Student Interface
interface Student extends Document {
    name : string ,
    age : number ,
    email : string ,
    gender : string , 
    grade : number
}


// Schema
const studentSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    grade:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

// Model initialize
const studentModel = mongoose.model<Student>("Student",studentSchema);
export default studentModel;
