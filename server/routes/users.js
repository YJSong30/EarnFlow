const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');

// Register user
// POST request b/c sending data to the server 

router.post('/register', userController.signupUser);
router.post('/login', userController.loginUser);
// router.get('/profile', userController.getUserProfile);
// router.put('/profile', userController.updateUserProfile);


module.exports = router;