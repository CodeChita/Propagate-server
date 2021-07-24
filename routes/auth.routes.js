const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model');

router.post('/signup', async (req, res) => {
    try {
    const {username, email, password } = req.body;
    console.log(email, password);
 
    // -----SERVER SIDE VALIDATION ----------
    
    if (!username || !email || !password) {
        res.status(200)
          .json({
            errorMessage: 'Please enter nickname, email and password'
          });
        return;  
    }
    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(200).json({
          errorMessage: 'Email format not correct'
        });
        return;  
    }
    const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    if (!myPassRegex.test(password)) {
      res.status(200).json({
        errorMessage: 'Password needs to have 8 characters, a number and Uppercase alphabet and a special character!'
      });
      return;  
    }

    //creating password hash
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    let user = await UserModel.create({username, email, passwordHash: hash})
        user.passwordHash = "***";
        res.status(200).json(user);
    
    }
    catch(err) {
        if (err.code === 11000) {
          res.status(200).json({
            errorMessage: 'email entered already exists!',
            message: err,
          });
        } 
        else {
          res.status(200).json({
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
                    res.status(200).json({ error: 'Passwords don\'t match'})
                    return; 
            }
    }
      
      //throw an error if the sign-in fails. 
    catch(err) {
        res.status(200).json({
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

// GOOGLE SIGN-UP //
router.post("/google/info", (req, res, next) => {
    const {firstName, lastName, email, googleId} = req.body
    console.log(firstName)
    // the name itself will include the last name
    try {
      // Create the user in the DB
      UserModel.create({firstName, lastName, googleId, email})
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

module.exports = router;