const express = require("express");
const router = express.Router();
const User = require("../../Models/Auth");
const { validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../config/keys')
const bcrypt = require("bcrypt");
router.post("/", [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password cannot be blank").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please Login with correct Credentials" });
        } else {
            const comparePassword = bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({ error: "Please Login with correct Credentials" });
            } else {
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                const access_token = jwt.sign(payload, JWT_SECRET.JWT_SECRET);
                res.json({ access_token });
            }
        }
    }
})

module.exports = router;