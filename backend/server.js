const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const exerciseRouter=require('./routes/exercises');
const usersRouter=require('./routes/users');
const app=express();
const port=process.env.PORT||5000;

require('dotenv').config({debug:true});
const uri=process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(uri)

app.use('/exercises',exerciseRouter);
app.use('/users',usersRouter);


app.listen(port,()=>{
  console.log(`${port}でサーバーが起動しました`);
})
