const mongoose=require('mongoose');
const app=require('./main')
const dotenv=require('dotenv');
const result = dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.LOCAL_CONN_STR)
  .then((conn)=>{
    console.log('connection is succesfull');
  })
  .catch((err)=>{
    console.log('connection failed due to error',err);
  });

  app.get('env');

  const port=process.env.PORT||5000
  app.listen(port,()=>{
    console.log('server is started on the port')
  })