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
          errorMessage: 'Unauthorized user',
          code: 401,
      })
  };
};


// THIS IS A PROTECTED ROUTE
// will handle all get requests to http:localhost:5005/api/user
router.get("/user", isLoggedIn, async (req, res, next) => {
  const {_id: userId} = req.session.loggedInUser
  let userData = await UserModel.findById(userId).populate()
  userData.passwordHash = "***"
  req.session.loggedInUser = userData
  console.log('userData', userData)
  res.status(200).json(userData);
});


router.patch("/user/plant/:plant_id", async (req, res, next) => {
  const {plant_id} = req.params
  const updatedPlant = req.body
  c
  const response = await PlantModel.findByIdAndUpdate(plant_id, {available: updatedPlant.available})
  console.log(response)
})

module.exports = router;
