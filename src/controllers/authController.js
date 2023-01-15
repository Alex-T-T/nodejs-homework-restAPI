const { User } = require('../models');
const { RequestError, sendEmail, verificationMessage } = require('../utils');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const gravatar = require('gravatar'); 
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid')

// newUser registration 
const registerController = async (req, res, next) => {
    const { email, password, subscription } = req.body;
    if (email === undefined || password === undefined) {
        throw RequestError(400, "missing require fields")
    }
    const user = await User.findOne({ email });
        
    if (user) {
        throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash("password", 10);

    const avatarURL = gravatar.url(email);

    const verificationToken = uuidv4();

    const newUser = await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });

    const message = verificationMessage(email, verificationToken);

    sendEmail(message);

    res.status(201).json({user: {email, subscription: newUser.subscription, avatarURL}});
};

// Login
const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
        throw RequestError(400, "missing require fields")
    }

    const user = await User.findOne({ email });
        
    if (!user) {
        throw RequestError(401, "Email or password is wrong");
    }

    const checkedpassword = bcrypt.compare(password, user.password);

    if (!checkedpassword) {
        throw RequestError(401, "Email or password is wrong");
    }

    if (!user.verify) {
        throw RequestError(403, "Not verifyed");
    }

    // create token

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(user._id, {token})

    res.status(200).json({ token, user: {email, subscription: user.subscription, avatarURL: user.avatarURL }});
};

// get current user
const currentUserController = async (req, res, next) => {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
}

// logout
const logoutUserController = async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null }); 
    res.status(204).json();
}

// update user subscription
const updateUserSubscriptionController = async (req, res, next) => {
    const { subscription } = req.body;
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { subscription });
    res.status(200).json({_id, subscription});
}

// update user avatar

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatarController = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    
    const upgradeAvatar = await Jimp.read(tempUpload);
    upgradeAvatar.resize(250, 250).write(tempUpload);

    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({_id, avatarURL});
}

const verificationUserEmailController = async (req, res, next) => {
    const { verificationToken } = req.params;

    if (!verificationToken) {
        throw RequestError(400, "Verification failed");
    }

    const user = await User.findOne({ verificationToken })

    if (!user) {
        throw RequestError(404, "User not found");
    }

    await User.findOneAndUpdate(user._id, { verificationToken: null, verify: true})

    res.status(200).json('Verification successful')
}

const secondVerificationUserEmailController = async (req, res, next) => {
    const { email } = req.body;
    if (email === undefined) {
        throw RequestError(400, "missing require fields")
    }

    const user = await User.findOne({ email });
        
    if (!user) {
        throw RequestError(401, "Email is wrong");
    }

    if (user.verify) {
        throw RequestError(400, "Verification has already been passed");
    }

    const verificationToken = user.verificationToken;
    
    // SendGrid
    const message = verificationMessage(email, verificationToken);

    sendEmail(message);

    res.status(200).json('Verification email sent');
}

module.exports = {
    registerController,
    loginController,
    currentUserController,
    logoutUserController,
    updateUserSubscriptionController,
    updateUserAvatarController,
    verificationUserEmailController,
    secondVerificationUserEmailController,
};