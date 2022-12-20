const Joi = require('joi');

const updateContactSubscriptionValidation = (req, res, next) => {

    const schema = Joi.object({
        subscription: Joi.string()
            .valid('start', 'pro', 'business')
            .required()
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({
                message: validationResult.error.message,
            });
    }

    next();
};
    
module.exports = updateContactSubscriptionValidation;