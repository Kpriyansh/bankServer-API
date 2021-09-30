const router = require('express').Router();
const BankUser = require('../Models/user');
const bcrypt = require('bcryptjs');
// const Formdata = require('form-data');
// const axios = require("axios");

// const sendOTPmessage = async()=>{
//     try {
//             const data = new FormData();
//             data.append('mobile','9608925141');
//             data.append('sender_id','India Bank');
//             data.append('message','Hey customer, your OTP code is {code}');
//             data.append('expiry','900');

//             const response = await axios({
//                 method:'POST',
//                 url:'http://d7networks.com/api/verifier/send',
//                 headers:{
//                     Authorization: 'Token 8a427a5a014fd23e3171e4b93089f1d153c70d53',
//                     ...data.getHeaders(),
//                 },
//                 data:data,

//             });
//             console.log('data->', response?.data);
//     } catch (error) {
//         console.log(error.message);
//     }
// }



router.post('/register', async(req,res) => {
    try {
        const user=req.body;
     
        if(!user.username||!user.email||!user.password||!user.phone){
            return res.status(400).json('Invalid credentials');
        }
        const findUser = await BankUser.findOne({email:user.email});
        const findname = await BankUser.findOne({username:user.username});
        if(findname){
            return res.status(403).json('Try different username');
        }
        if(findUser){
            return res.status(403).json('User already exist! Kindly go to signin');
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,salt);
        const newuser = await new BankUser({
            username:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPassword
        });
        await newuser.save();
        
        res.json(newuser);
    } catch (err) {
        res.status(500).json('Something went wrong ! Try Again');
    }
})

module.exports = {
    registerRouter:router
};
