const express = require("express");
const router = express.Router();
const User = require("../../Models/Auth");
const { validationResult, check } = require('express-validator');
const bcrypt = require("bcrypt");

router.post("/", [
    check('first_name', "Please Enter a First Name").not().isEmpty().trim().escape(),
    check('last_name', "Please Enter a Last Name").not().isEmpty().trim().escape(),
    check("email").isEmail().custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    reject(new Error("Server Error"));
                }
                if (Boolean(user)) {
                    reject(new Error("E-mail already in use"))
                }
                resolve(true)
            })
        })
    }),
    check("password", "Password must be Strong").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/),
], async (req, res) => {
    const errors = validationResult(req);
    const salt = await bcrypt.genSalt(10);
    const securePassword = bcrypt.hashSync(req.body.password, salt);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: securePassword,
    })
    if (user) {
        res.send("User Created Successfully")
    }
})

module.exports = router;