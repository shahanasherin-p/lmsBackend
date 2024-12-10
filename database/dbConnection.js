const mongoose=require('mongoose')
const connectionString=process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("Mongodb atlas connected successfully with LearningManagementServer")
}).catch(err=>{
    console.log("Mongodb connection failed")
    console.log(err)
})