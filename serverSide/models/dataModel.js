const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    title: String,
    description: String,
    category: String,
    username:String,

}, { versionKey: false });

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        lowercase:true
    },
    email:{
        type:String,
        require:true

    },
    password:{
        type:String,
        require:true
    }
},{versionKey:false})



const TaskSchema = mongoose.model("datas", taskSchema);
const RegisterSchema = mongoose.model("details",registerSchema);
module.exports = {TaskSchema,RegisterSchema}
