const router = require("express").Router();
const UserModel = require('../models/User.model');
const PlantModel = require('../models/Plant.model')

// middleware to check if user is loggedIn
const isLoggedIn = (req, res, next) => {  
  if (req.session.loggedInUser) {
      //calls whatever is to be executed after the isLoggedIn function is over
      next()
  }
  else {
      res.status(401).json({
          message: 'Unauthorized user',
          code: 401,
      })
  };
};


// THIS IS A PROTECTED ROUTE
// will handle all get requests to http:localhost:5005/api/user
router.get("/user", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});

router.get("/user/profile", /*isLoggedIn, */ async (req, res, next) => {
  const userData = await UserModel.findOne({email: "george.ds.brooks@gmail.com"}).populate()
  console.log(userData)

});

router.patch("/user/plant/:plant_id", async (req, res, next) => {
  const {plant_id} = req.params
  const updatedPlant = req.body
  c
  const response = await PlantModel.findByIdAndUpdate(plant_id, {available: updatedPlant.available})
  console.log(response)
})

module.exports = router;
