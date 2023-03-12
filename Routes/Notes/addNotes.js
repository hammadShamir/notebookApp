const express = require("express");
const router = express.Router();
const getUser = require("../../middleware/getUser");
const Notes = require("../../Models/Notes")
const { validationResult, check } = require('express-validator');
router.post("/addnotes", [
    check("title", "Please Enter a Title").not().isEmpty().trim().escape().isLength({ min: 3 }),
    check("description", "Please Enter a Description").not().isEmpty().trim().escape().isLength({ min: 5 })
],
    getUser, async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        } else {
            const { title, description, tag } = req.body;

            const newNote = new Notes({
                title, description, tag, user: req.user.id,
            })
            const saveNote = await newNote.save();
            res.json(saveNote)
        }
    })

module.exports = router;