const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { userRegisterValidation, userLoginValidation,
    auth, updateContactSubscriptionValidation, upload } = require('../../middlewares');
const { registerController, loginController,
    currentUserController, logoutUserController,
    updateUserSubscriptionController, updateUserAvatarController, 
    verificationUserEmailController, secondVerificationUserEmailController,
} = require('../../controllers');
const {controllerCheck} = require('../../utils'); 

// register new user
router.post('/register', userRegisterValidation, controllerCheck(registerController));

// login
router.post('/login', userLoginValidation, controllerCheck(loginController))

// GET current user
router.get('/current', auth, controllerCheck(currentUserController));

// POST logout
router.post('/logout', auth, controllerCheck(logoutUserController))

// PATCH update subscription field on User
router.patch('/', auth, updateContactSubscriptionValidation, controllerCheck(updateUserSubscriptionController) ) 

// PACH update avatar for User
router.patch('/avatars', auth, upload.single('avatar'), controllerCheck(updateUserAvatarController))

// GET user for verificationToken
router.get('/verify/:verificationToken', controllerCheck(verificationUserEmailController))

// POST once more send letter with verificattion link
router.post('/verify', controllerCheck(secondVerificationUserEmailController))

module.exports = router;
