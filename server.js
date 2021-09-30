const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002
const localENV = dotenv.config().parsed;
const register = require('./Routes/register');
const signin = require('./Routes/signin');
mongoose.connect(localENV.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

.then(()=>console.log('Connected to DB'))
.catch((err)=>console.log(err));

app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

// app.get('/',(req,res)=>{
//      console.log(res.send('hello'));
// });
app.use('/auth',register.registerRouter);
app.use('/auth',signin.signinRouter);

app.listen(PORT, ()=>console.log(`Server is running at port ${PORT}`));