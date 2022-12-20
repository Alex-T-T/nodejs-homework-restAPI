const Joi = require('joi');

const userLoginValidation = (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
            .required(),

        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({ message: validationResult.error.message });
    }

    next();
}

    module.exports = userLoginValidation;