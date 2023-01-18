const { User } = require('../models');
const { RequestError } = require("../utils");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    console.log('token =>', token)
    console.log('bearer =>', bearer)

    try {
        if (bearer !== "Bearer") {
        next(RequestError(401, "Not authorized"))
    }

    if (!token) {
        next(RequestError(401, "Not authorized"))
        return
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    if (!id) {
        next(RequestError(401, "Not authorized"))
    }

    const user = await User.findById(id);

    if (!user || !user.token) {
        next(RequestError(401, "Not authorized"))
    }

    req.user = user;
    next()
    } catch (error) {
        if (error.message === "Invalid signature") {
            error.status = 401
        }
        next(error)
    }

    // if (bearer !== "Bearer") {
    //     next(RequestError(401, "Not authorized"))
    // }

    // if (!token) {
    //     next(RequestError(401, "Not authorized"))
    //     return
    // }

    // const { id } = jwt.verify(token, SECRET_KEY);

    // if (!id) {
    //     next(RequestError(401, "Not authorized"))
    // }

    // const user = await User.findById(id);

    // if (!user || !user.token) {
    //     next(RequestError(401, "Not authorized"))
    // }

    // req.user = user;
    // next()
}

module.exports = auth;