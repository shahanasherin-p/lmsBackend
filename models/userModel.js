const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({

  userName: {
    type:String,
    required:true

  },
  userEmail: {
    type:String,
    required:true

  },
  password: {
    type:String,
    required:true

  },
  role: String,
})

const users=mongoose.model("users",userSchema)

module.exports=users