const Joi = require('joi');

const updateContactFavouriteValidation = (req, res, next) => {

        const schema = Joi.object({
            favourite: Joi.boolean()
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
}
    
module.exports = updateContactFavouriteValidation;