const rateLimiter = require("express-rate-limit");

const loginLimiter = rateLimiter({
    windowMs: 60 * 1000,
    max: 5, 
    message: {
        status: 429,
        message: "Too many login attempts, please try again after 1 minute"
    },
    standardHeaders: true,
    legacyHeaders: false

});

module.exports = loginLimiter;