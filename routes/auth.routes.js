const router = require("express").Router();
const UserModel = require("../models/User.model")

// LOG OUT //

router.get('/logout', (req, res, next) => {

});

// SIGN-UP //

router.get('/signup', (req, res, next) => {
    
});
router.post('/signup', (req, res, next) => {

});

// GOOGLE SIGN-UP //
router.post("/google/info", (req, res, next) => {
    const {firstName, lastName, email, image, googleId} = req.body
    // the name itself will include the last name
    try {
      // Create the user in the DB
      UserModel.create({firstName, lastName, googleId, profileImageUrl, email})
        .then((response) => {
          // Save the loggedInInfo in the session
          // We'll stick to using sessions just to not over complicate the students with tokens and cookies
          req.session.loggedInUser = response
          res.status(200).json({data: response})
        })
    }
    catch(error) {
      res.status(500).json({error: `${error}`})
    }
  });
  

// SIGN-IN //
router.get('/signin', (req, res, next) => {

});
router.post('/signin', (req, res, next) => {

});

module.exports = router;
