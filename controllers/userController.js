const users=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


// register

// exports.registerUserController = async (req, res) => {
//     console.log("Inside registerUserController")
//     const { userName, userEmail, password, role } = req.body;

//    try {
//     const existingUser=await users.findOne({
//        $or:[{ userEmail }, { userName }], 
//     })
//     if(existingUser){
//         res.status(406).json("Username or Email is already exists")
//     }

//     const hashPassword=await bcrypt.hash(password,10)
//     const newUser=new users({
//         userName,
//         userEmail,
//         role,
//         password: hashPassword,
//     })

//     await newUser.save()
//     return res.status(200).json("user register successfully")
   
//    } catch (err) {
//     res.status(401).json(err)
//    }
// }

exports.registerUserController = async (req, res) => {
    console.log("Inside registerUserController");
    const { userName, userEmail, password, role } = req.body;

    try {
        const existingUser = await users.findOne({
            $or: [{ userEmail }, { userName }],
        });

        if (existingUser) {
            return res.status(406).json("Username or Email already exists"); // Add return here
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new users({
            userName,
            userEmail,
            role,
            password: hashPassword,
        });

        await newUser.save();
        return res.status(200).json("User registered successfully"); // Return response here
    } catch (err) {
        return res.status(401).json(err); // Add return here
    }
};




// login

exports.loginUserController = async (req, res) => {
    console.log("Inside loginUserController")
    const { userEmail, password } = req.body;
    try {
        const checkUser = await users.findOne({ userEmail });
        if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
            return res.status(401).json("Invalid username or password")
        }

        const accessToken = jwt.sign({
            id: checkUser._id, // Change _id to id
            userName: checkUser.userName,
            userEmail: checkUser.userEmail,
            role: checkUser.role,
        },
        process.env.JWTPASSWORD, // Use environment variable
        { expiresIn: "120m" })

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                accessToken,
                user: {
                    _id: checkUser._id,
                    userName: checkUser.userName,
                    userEmail: checkUser.userEmail,
                    role: checkUser.role,
                },
            }
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

// exports.loginUserController=async(req,res)=>{
//     console.log("Inside loginUserController")
//     const { userEmail, password } = req.body;
//     try{
//         const checkUser = await users.findOne({ userEmail });
//         if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
//             return res.status(401).json("Invalid username or password")
//         }
    
//         const accessToken=jwt.sign({
//             _id:checkUser._id,
//             userName: checkUser.userName,
//             userEmail: checkUser.userEmail,
//             role: checkUser.role,
//         },
//         "JWT_SECRET",
//         { expiresIn: "120m" }) 
//         res.status(200).json({
//             success: true,
//             message: "Logged in successfully",
//             data:{
//                 accessToken,
//                 user: {
//                     _id: checkUser._id,
//                     userName: checkUser.userName,
//                     userEmail: checkUser.userEmail,
//                     role: checkUser.role,
//                   },
//             }
//         })
    
//     }
//     catch (err){
//         res.status(401).json(err)
//     }
// }