const express = require("express");
const router = express.Router();
const getUser = require("../../middleware/getUser");
const Notes = require("../../Models/Notes")
router.get("/fetchallnotes", getUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

module.exports = router;