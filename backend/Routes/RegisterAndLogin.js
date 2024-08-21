const express = require('express');
const userModel = require('../models/userModel');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const secret = "RESTAPI";


router.post("/register", [
    body('email').isEmail(),
    body('phoneNumber').isMobilePhone(),
    body('password').isLength({ min: 8 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, phoneNumber, password } = req.body;

        
        const existingUser = await userModel.findOne({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        });

        if (existingUser) {
            return res.status(403).json({ error: "User already exists" });
        }

        
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

           
            const newUser = await userModel.create({
                email: email,
                phoneNumber: phoneNumber,
                password: hash
            });

            return res.status(200).json({
                message: "Sign Up Successfully",
                user: newUser.email 
            });
        });
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body;

        if (!email && !phoneNumber) {
            return res.status(400).json({
                error: "Email or Phone Number is required"
            });
        }

        let user;
        if (email) {
            user = await userModel.findOne({ email: email });
        } else if (phoneNumber) {
            user = await userModel.findOne({ phoneNumber: phoneNumber });
        }

        if (!user) {
            return res.status(403).json({
                error: "Unknown User"
            });
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), 
                    data: { userId: user._id, email: user.email } 
                }, secret);

                return res.status(200).json({
                    message: "Login successful",
                    token: token,
                    user: user.email 
                });
            } else {
                return res.status(400).json({
                    error: "Invalid Password"
                });
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
});

module.exports = router;