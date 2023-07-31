const User=require('../models/user.model');
const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
    try{const users=await User.find();
       res.json({data:users})
    }catch(error){
        res.send(error);
    }
})

router.post('/',async(req,res)=>{
    try{
        const username=req.body.username;
        if(!username){
            return res.status(400).json({error:'ユーザー名は必須です'});
        }else if(username.length<4){
            return res.status(400).json({error:'名前は３文字以上でお願いします'});
        }
        const newUser=new User({username});
       await newUser.save();
        res.json(result);
    }catch(error){
        res.send(error);
    } 
})

module.exports=router;

