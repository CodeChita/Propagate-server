const router = require("express").Router();
const UserModel = require("../models/User.model")
const PlantModel = require("../models/Plant.model")
const axios = require('axios');


// CLOUDINARY ROUTES //

const uploader = require('../config/cloudinary.config');

router.post('/profile/upload', uploader.single("imageUrl"), (req, res, next) => {
    // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
    const { email } = req.body

    console.log('file is: ', req.file)
    UserModel.findOneAndUpdate(email, { profileImageUrl: req.file.path }, { new: true })
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            next(err)
        });



    if (!req.file) {
        console.log("there was an error uploading the file")
        next(new Error('No file uploaded!'))
        return
    }
})

router.post('/plant/upload',uploader.single("imageUrl"), async (req, res, next) => {
    try {
        console.log('plant file is: ', req.file.path)
        console.log('type is:', req.body.organ)
        const {path} =  await req.file
        const {organ} = await req.body
        const encoded =  await encodeURIComponent(path);
        console.log(encoded)

        const response = await axios(`${process.env.PLANT_URL}?api-key=${process.env.PLANT_API_KEY}&images=${encoded}&organs=${organ}`)
                console.log(response.data.results[0])
                res.status(200).json(response.data.results[0]);
        if (!req.file) {
            console.log("there was an error uploading the file")
            next(new Error('No file uploaded!'))
            return
        }
    }
    catch(err) {
        console.log(err)
    };  
})

// You will get the image url in 'req.file.path'
// Your code to store your url in your database should be here
module.exports = router;
