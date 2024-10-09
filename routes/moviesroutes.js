const express=require('express');
const moviescontroller=require('../controllers/moviescontroller.js')
const router=express.Router();


router
  .route("/")
  .get(moviescontroller.getAllItems) // GET all items
  .post( moviescontroller.createNewItem)
  

router
  .route('/:id')
  .delete(moviescontroller.deleteItemById)   
  .patch(moviescontroller.updateItemById)
 



  module.exports=router;