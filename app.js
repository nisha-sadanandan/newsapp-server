import express from 'express'
import cors from 'cors'
import userRouter from './Router/UserRouter.js';
import employeeRouter from './Router/employeeRouter.js';
import postRouter from './Router/postRouter.js'
import path from 'path'
import mongoose from 'mongoose';
import 'dotenv/config'

const app=express()

async function main() {
    console.log(process.env.MONGODB_URL)
    await mongoose.connect('mongodb+srv://nisha:kqFwzBafjaTXqwRQ@cluster0.yo0em7y.mongodb.net/news');
  }
  
  main().then(console.log("connected to DB")).catch(err =>console.log(err))
  

app.use(express.json())
app.use(cors())
app.use('/users',userRouter)
app.use('/employees',employeeRouter)
app.use('/posts',postRouter)
const dirname =path.resolve()
app.use(express.static(path.join(dirname,'uploads')))


const port =process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})