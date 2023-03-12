const express = require("express");
const router = express.Router();
const User = require("../../Models/Auth");
const getUser = require("../../middleware/getUser");

router.post("/", getUser, async (req, res) => {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (user) {
        res.send(user)
    } else {
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;