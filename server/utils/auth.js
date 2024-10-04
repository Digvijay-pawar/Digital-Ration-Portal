const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to hash the password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Function to compare plain password with hashed password
async function comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

// Function to create JWT
function createJWT(payload, JWT_SECRET) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' }, // Token expiration time
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
}



module.exports = {
    hashPassword,
    comparePassword,
    createJWT,
};
