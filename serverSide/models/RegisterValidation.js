const Joi = require('joi');

const validateRegistration = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: error.details.map((detail) => detail.message) });
    }
    next();
};

module.exports = { validateRegistration };
