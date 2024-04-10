const express = require('express');
const router = express.Router();
const {
    verifyUser,
    updateProfile,
    newUser,
    getUser} = require('../controllers/userController');
    
router.use(express.json())

router.post('/register', newUser)
router.post('/login', getUser)
router.put('/profile/:username', verifyUser, updateProfile)

module.exports = router;