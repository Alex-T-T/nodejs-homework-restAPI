const Joi = require('joi');

const putContactValidation = (req, res, next) => {

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({message: 'missing fields'});
            return;
        }

        const schema = Joi.object({
            name: Joi.string()
                .regex(/^[a-z A-Z]{2,30}$/)
                .optional(),
            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
                .optional(),
            phone: Joi.string()
                .regex(/^[0-9]{10,15}$/)
                .optional(),
            favourite: Joi.boolean()
                .optional()
        });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({ message: validationResult.error.message});
    }

    next();
}
    
module.exports = putContactValidation;