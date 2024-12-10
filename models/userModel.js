const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({

  userName: String,
  userEmail: String,
  password: String,
  role: String,
})

const users=mongoose.model("users",userSchema)

module.exports=users