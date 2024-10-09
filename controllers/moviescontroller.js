const Movie=require('../Model/movieModel');


exports.getAllItems = async (req, res) => {
    try {
      const movies = await Movie.find();
      res.status(200).json({
        length: movies.length,
        status: "success",
        data: {
          movies: movies,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };
  
  // Function to handle POST new item
  exports.createNewItem = async (req, res) => {
    //METHOD 1
    // const testMovie=new Movie({});
    // testMovie.save().then(()=>{});
    //METHOD2
    try {
      const movie = await Movie.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          movie: movie,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "faile",
        message: err.message,
      });
    }
  };
  

  exports.updateItemById = async (req, res) => {
    try {
      const movieID = req.params.id;
      const movie = await Movie.findByIdAndUpdate(movieID, req.body, {
        new: true,
        runValidators: true,
      }); //if we specify the true it will return and runvalidators used to enable the unique and constraints
      res.status(200).json({
        status: "success",
        data: {
          movie: req.body,
          new: true,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };
  

  exports.deleteItemById = async (req, res) => {
    try {
      const movieID = req.params.id;
      const movie = await Movie.findByIdAndDelete(movieID); //if we specify the true it will return
      res.status(200).json({
        status: "success",
        data: {
          movie: movie,
          new: true,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };
  