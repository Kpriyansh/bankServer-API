const router = require('express').Router();
const User = require('../Models/user');
const bcrypt = require('bcryptjs');
// const FormData = require('form-data');
// const axios = require("axios");

// const sendOTPmessage = async()=>{
//     try {
//             const data = new FormData();
//             data.append('mobile','919608925141');
//             data.append('sender_id','India Bank');
//             data.append('message','Hey customer, your OTP code is {code}');
//             data.append('expiry','900');

//             const response = await axios({
//                 method:'POST',
//                 url:'https://d7networks.com/api/verifier/send',
//                 headers:{
//                     Authorization: 'Token 8a427a5a014fd23e3171e4b93089f1d153c70d53',
//                     ...data.getHeaders()
//                 },
//                 data:data

//             });
//             console.log('data->', response.data);
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// const fun = ()=>{
//     var data = new FormData();
// data.append('mobile', '919608925141');
// data.append('sender_id', 'SMSINFO');
// data.append('message', 'Your otp code is {code}');
// data.append('expiry', '900');

// var config = {
//   method: 'post',
//   url: 'https://d7networks.com/api/verifier/send',
//   headers: { 
//     'Authorization': 'Token 8a427a5a014fd23e3171e4b93089f1d153c70d53', 
//     ...data.getHeaders()
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
// }
router.post('/signin', async(req,res) =>{
    try {
        
        if(!req.body.email||!req.body.password){
            return res.status(500).json('Invalid credentials!');
        }
        const finduser = await User.findOne({email:req.body.email});
        if(finduser === null){
            return res.status(404).json('User not found');
        }
        // sendOTPmessage();
        // fun();
        await bcrypt.compare(req.body.password,finduser.password)
        .then(valid => {
            if(valid)return res.json({
                username:finduser.username
            })
            res.status(404).json('Incorrect email or password');
        })
    } catch (error) {
        res.status(404).json('Something went wrong!');
    }
})
module.exports = {
    signinRouter:router
}