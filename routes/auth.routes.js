const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model');

router.post('/signup', async (req, res) => {
    try {
    const {nickname, email, password } = req.body;
    console.log(nickname, email, password);
 
    // -----SERVER SIDE VALIDATION ----------
    
    if (!nickname || !email || !password) {
        res.status(500)
          .json({
            errorMessage: 'Please enter nickname, email and password'
          });
        return;  
    }
    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(500).json({
          errorMessage: 'Email format not correct'
        });
        return;  
    }
    const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    if (!myPassRegex.test(password)) {
      res.status(500).json({
        errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet'
      });
      return;  
    }

    //creating password hash
    let salt = await bcrypt.genSalt(10);
    let hash = awaitbcrypt.hash(password, salt);
    let user = await UserModel.create({nickname, email, passwordHash: hash})
        user.passwordHash = "***";
        res.status(200).json(user);
    
    }
    catch(err) {
        if (err.code === 11000) {
          res.status(500).json({
            errorMessage: 'email entered already exists!',
            message: err,
          });
        } 
        else {
          res.status(500).json({
            errorMessage: 'Something went wrong!',
            message: err,
          });
        }
    }
});
 
// will handle all POST requests to http:localhost:5005/api/signin
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    // -----SERVER SIDE VALIDATION ----------
    
    if ( !email || !password) {
        res.status(500).json({
            error: 'Please enter email and password',
       })
      return;  
    }
    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(500).json({
            error: 'Email format not correct',
        })
        return;  
    }

    try {
    // Find if the user exists in the database 
        const userData = await UserModel.findOne({email})
    //check if passwords match
        const doesItMatch = await bcrypt.compare(password, userData.passwordHash)
            if (doesItMatch) {
                userData.passwordHash = "***";
                req.session.loggedInUser = userData;
                res.status(200).json(userData)
            }
                //if passwords do not match
            else {
                    res.status(500).json({ error: 'Passwords don\'t match'})
                    return; 
            }
    }
      
      //throw an error if the sign-in fails. 
    catch(err) {
        res.status(500).json({
            error: 'Sign-In Failed!',
            message: err
        })
        return;  
      }
  
});
 
// will handle all POST requests to http:localhost:5005/api/logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    // Nothing to send back to the user
    res.status(204).json({});
})

<<<<<<< HEAD
=======
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
>>>>>>> 3f184b2b3558373c45e53472b0b1ce79c1f8979a

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

module.exports = router;