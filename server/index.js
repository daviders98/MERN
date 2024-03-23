require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const bodyParser = require('body-parser')
const cors = require('cors')

mongoose.connect(
    `${process.env.DB_URL}`
)

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

// Parse application/json
app.use(bodyParser.json());

app.get('/users', async (req,res)=>{
    const users = await UserModel.find({})
    console.log(users)
    return res.json(users)
})

app.post('/users/create',async (req,res)=>{
    try{
        const user = req.body
        console.log(req.body)
    const newUser = new UserModel(user)
    
    await newUser.save()

    return res.json(newUser)   
    }catch(e){
        console.log(e)
        return res.json(e)
    }
})

app.listen(3001,()=>{
    console.log('Server is running')
})