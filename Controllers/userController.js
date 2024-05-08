import User from '../model/userModel.js';
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


 const addUser = async (req,res)=>{

    try{

        const saltRounds = 10;
        bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
            if(err){
                console.error('Error occured while hashing:',err)
            }
            var userItem={
                name :req.body.name,
                username :req.body.username,
                password :hash,
                email:req.body.email,
                date:new Date()
            
         
          }
           var users = new User(userItem)
           await users.save()
           res.status(201).json(users)
        })
      }

      catch(error){
        console.log(error)
        res.status(505).json({error:'internal server error'})
    }

}

const login = async(req,res)=>{
    try{

        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(500).json({message:"user not found"})
        }

        const isvalid = await bcrypt.compare(password,user.password)
        console.log(isvalid)
        if(!isvalid){
            return res.status(500).json({message:'invalid credentials'})
        }

        let payload ={user:email,pwd:password};
        const secret_key = process.env.JWT_SECRET_KEY
        let token = jwt.sign(payload,secret_key)

        res.status(200).json({message:"Login successful",token:token})

    } catch(error){
        console.log(error)
        res.status(505).json({error:'internal server error'})
    }
}
  

const getUser = async(req,res)=>{
    try{
        const users = await User.find({})
        if(!users){
            res.status(404).json({error:'user not found'})
        }
        res.status(200).json(users)
    }catch(error){
        console.log(error)
        res.status(505).json({error:'internal server error'})
    }
}

const getUserByUserName = async(req,res)=>{
    try{
        const users = await User.findOne({username:req.params.username}).exec();
        if(!users){
            res.status(404).json({error:'user not found'})
        }
        res.status(200).json(users)
    }catch(error){
        console.log(error)
        res.status(505).json({error:'internal server error'})

    }
}

const updateUserById = async(req,res)=>{
    try{
        const users = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!users){
            res.status(404).json({error:'user not found'})
        }
        res.status(200).json(users)
    }catch(error){
        console.log(error)
        res.status(505).json({error:'internal server error'})

    }
}

const deleteUser = async(req,res)=>{
    try{
        const users = await User.findByIdAndDelete(req.params.id)
        if(!users){
            res.status(404).json({error:'user not found'})
        }
        res.status(200).json({message:"succeessfully deleted"})
    }catch(error){
        console.log(error)
        res.status(505).json({error:'internal server error'})

    }
}



export {getUser,getUserByUserName,addUser,updateUserById,deleteUser,login}