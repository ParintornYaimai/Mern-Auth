const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser') 

app = express()

//connect 
mongoose.connect(process.env.DATABASE)
.then(res=>{
    console.log('Connect is Database Complete');
})
.catch(err=>{
    console.log('!!! Database connection error');
})
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser());

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)








const port = process.env.PORT || 5500
app.listen(port,()=>console.log('server is started'))