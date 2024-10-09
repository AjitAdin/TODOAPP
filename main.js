const express=require('express');
const morgan=require('morgan');
const moviesrouter=require('./routes/moviesroutes.js');
const app=express();
const path=require('path');
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','movies.html'));
  })
app.use('/movies',moviesrouter)

module.exports=app;