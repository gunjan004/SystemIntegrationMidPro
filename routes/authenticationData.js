const router = require('express').Router();
const userModel = require('../models/user');
const gameModel = require('../models/games');
const { signUpValidation, loginValidation, gameValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

router.post('/signUp', async (req,res)=>{

    const { error } = signUpValidation(req.body);

    if(error) return res.status(400).send({
        status : res.statusCode,
        message: error.details[0].message
    });

    const emailExist = await userModel.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send({
        status : res.statusCode,
        message:'Email already exist.Try to Login..'
    });

    const salt = await bcrypt.genSalt(10);
    const hashPass =  await bcrypt.hash(req.body.password , salt);

    try{
        const user =  new userModel({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            gender : req.body.gender,
            contactNo : req.body.contactNo,
            email : req.body.email,
            password : hashPass
        });

        await user.save();
        console.log("USER SAVED!");
        const token = jwt.sign({_id : user._id}, process.env.TOKEN_KEY);
        console.log("token " + token);

        res.header('token', token);
        res.send({
            status : res.statusCode,
            token : token,
            userId : user._id,
            name : user.firstName + " " + user.lastName,
            email : user.email,
            contactNo : user.contactNo,
        });


    }
    catch(err){
        res.status(400).send({
            status : res.statusCode,
            message :err
        });
    }
});

router.post('/login', async (req,res)=>{

    const { error } = loginValidation(req.body);

    if(error) return res.status(400).send({
        status : res.statusCode,
        message: error.details[0].message
    });

    const user = await userModel.findOne({email : req.body.email});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Email does not exist, please register!'
    });

    const validatePass = await bcrypt.compare(req.body.password , user.password);
    if(!validatePass) return res.status(400).send({
        status : res.statusCode,
        message : 'Invalid password'
    });

    const token = jwt.sign({_id : user._id}, process.env.TOKEN_KEY);
    res.header('token', token);
    res.send({
        status : res.statusCode,
        id: user._id,
        token: token,
        customerId : user.customerId,
        name : user.firstName + " " +  user.lastName,
        email : user.email
    })

});

//Add Game
router.post('/addGame', verifyToken, async (req,res)=>{

    const { error } = gameValidation(req.body);

    if(error) return res.status(400).send({
        status : res.statusCode,
        message: error.details[0].message
    });

    const user = await userModel.findOne({_id : req.user._id});

    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });

    try{
        const game =  new gameModel({
            name : req.body.name,
            category : req.body.category,
            imageUrl : req.body.imageUrl,
            description : req.body.description,
            rating : req.body.rating
        });

        console.log(" GAME: " + game);
        await game.save();
        console.log("GAME SAVED!");

         res.send({
            status : res.statusCode,
            message : "Game added successfully."
        });
    }
    catch(err){
        res.status(400).send({
            status : res.statusCode,
            message :err
        });
    }
});

//Get All Games
router.get('/getAllGames', verifyToken, async (req,res)=>{

    const user = await userModel.findOne({_id : req.user._id});
    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });

    let game = await gameModel.find();
    if(!game) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding game in database'
    });

    res.send({
        status : res.statusCode,
        game : game
    });
});


//Delete
router.delete('/deleteGame', verifyToken, async (req,res)=>{

    const user = await userModel.findOne({_id : req.user._id});

    if(!user) return res.status(400).send({
        status : res.statusCode,
        message : 'Error while finding user in database'
    });

    await gameModel.findOneAndDelete({_id : req.body.gameID});
   // await gameModel.findOneAndDelete({_id : "5dccf7626a7b4a3b18aa27d0"});

    res.status(200).send({
        status: res.statusCode,
        message : "Game deleted successfully"
    });
});



module.exports = router;

