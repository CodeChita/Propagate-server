const router = require("express").Router();
const UserModel = require('../models/User.model');
const PlantModel = require('../models/Plant.model')

router.get("/whoami", async (req, res,next) => {
  if (req.session.loggedInUser) {
    const {_id: userId} = req.session.loggedInUser
    let userData = await UserModel.findById(userId).populate('plantsOffered')
    userData.passwordHash = "***"
    req.session.loggedInUser = userData
    res.status(200).json(userData);
  }
  else {
    res.sendStatus(204)
  }
});

// middleware to check if user is loggedIn
const isLoggedIn = async (req, res, next) => {  
  if (req.session.loggedInUser) {
      //calls whatever is to be executed after the isLoggedIn function is over
      await next()
  }
  else {
      await res.status(401).json({
          errorMessage: 'Unauthorized user',
          code: 401,
      })
  };
};



// THIS IS A PROTECTED ROUTE
// will handle all get requests to http:localhost:5005/api/user
router.get("/user/whoami", isLoggedIn, async (req, res, next) => {
  const {_id: userId} = req.session.loggedInUser
  let userData = await UserModel.findById(userId).populate('plantsOffered')
  userData.passwordHash = "***"
  req.session.loggedInUser = userData
  console.log('userData', userData)
  res.status(200).json(userData);
});

router.get("/users/:userId", isLoggedIn, async (req, res, next) => {
  const {userId} = req.params
  let userData = await UserModel.findById(userId).populate('plantsOffered')
  userData.passwordHash = "***"
  res.status(200).json(userData);
});

router.patch("/user/plant/:plant_id", isLoggedIn, async (req, res, next) => {
  const {plant_id} = req.params
  const updatedPlant = req.body.plant
  const response = await PlantModel.findByIdAndUpdate(plant_id, updatedPlant, {new: true})
  res.status(200).json(response)
})

router.patch("/user/profile", isLoggedIn, async (req,res,next) => {
  const {_id: userId, about, username, email} = req.body.user
  const editedUser = {about: about, username: username, email: email}
  try {
    let response = await UserModel.findByIdAndUpdate(userId, editedUser, {new: true})
    res.status(200).json(response)
  }
  catch(err){
    res.status(401).json(err)
  }
})

router.delete("/user/profile/:userId", async (req,res,next) => {
  let {userId} = req.params
  try {
    console.log(userId)
    let response = await UserModel.findByIdAndDelete(userId)
    console.log(response)
    res.status(200).json(response)
  }
  catch(err){
    res.status(401).json(err)
  }
})

/////////SEARCH ROUTES///////////

router.get('/search', async (req, res, next) => {
  let response = await PlantModel.find({available: true}).populate('user')
  let matchingPlants = await response.map(plant => {
    plant.user.passwordHash = '***'
    return plant
  })
  console.log(matchingPlants)
  res.status(200).json(matchingPlants)
})

module.exports = router;
