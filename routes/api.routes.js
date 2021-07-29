const router = require("express").Router();
const UserModel = require("../models/User.model")
const PlantModel = require("../models/Plant.model")
const axios = require('axios');

// CLOUDINARY ROUTES //

const uploader = require('../config/cloudinary.config');

router.post('/profile/upload', uploader.single("imageUrl"), (req, res, next) => {
    const { email } = req.body
    console.log('file is:', req.file)
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

router.post('/plant/upload', uploader.single("imageUrl"), async (req, res, next) => {
    try {
        const { path } = req.file
        const { organ } = req.body
        const encoded = await encodeURIComponent(path);
        const response = await axios(`${process.env.PLANT_URL}?api-key=${process.env.PLANT_API_KEY}&images=${encoded}&organs=${organ}`)
        const plantData = {
            plant: response.data.results[0],
            picture: path
        }
        res.status(200).json(plantData);
        if (!req.file) {
            console.log("there was an error uploading the file")
            next(new Error('No file uploaded!'))
            return
        }
    }
    catch (err) {
        console.log(err)
    };
})

// router.post('/picture/upload', uploader.single("imageUrl"), async (req, res, next) => {
//     try {
//         console.log(req)
//         // const { path } = req.file
        
//         // const { organ } = req.body
//         // const encoded = await encodeURIComponent(path);
//         // const response = await axios(`${process.env.PLANT_URL}?api-key=${process.env.PLANT_API_KEY}&images=${encoded}&organs=${organ}`)
//         // const plantData = {
//         //     plant: response.data.results[0],
//         //     picture: path
//         // }
//         // res.status(200).json(plantData);
//         // if (!req.file) {
//         //     console.log("there was an error uploading the file")
//         //     next(new Error('No file uploaded!'))
//         //     return
//         // }
//     }
//     catch (err) {
//         console.log(err)
//     };
// })



///////////////// POST INFO ADDPLANT //////////////////

router.post('/plant/add', async (req, res, next) => {

    try {
        const { plantImageUrl, displayName, scientificName, commonName, location } = req.body
        let cordinate = await axios (`https://nominatim.openstreetmap.org/search.php?city=${location}&format=json&accept-language=en`)
        let city = await cordinate.data[0]
        const { _id: user } = req.session.loggedInUser
        await console.log(city)
        const result = await PlantModel.create({ plantImageUrl, displayName, scientificName, commonName, location: [+city.lat, +city.lon], user })
        await UserModel.findByIdAndUpdate(user, { $addToSet: { plantsOffered: result._id } }, { new: true })
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err)
    };
})

module.exports = router;