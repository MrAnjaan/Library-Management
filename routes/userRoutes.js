const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const {verifyToken}=require('../middleware/tokenvarification');

router.get('/',(req,res)=>{
    res.redirect('/login');
}); // For alreaady logged in user

router.get('/login',controller.ServeLoginPage);

router.get('/signup',controller.ServeSignUpPage);

router.post('/login',controller.handleLogin);

router.post('/signup',controller.handleSignUp);

router.get('/home',verifyToken, controller.ServeHomePage);



module.exports = router;