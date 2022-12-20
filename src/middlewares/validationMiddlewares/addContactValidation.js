const Joi = require('joi');

const addContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .regex(/^[a-z A-Z]{2,30}$/)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        phone: Joi.string()
            .regex(/^[0-9]{10,15}$/)
            .required(),
        favourite: Joi.boolean()
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({ message: validationResult.error.message });
    }

    next();
};

module.exports = addContactValidation;