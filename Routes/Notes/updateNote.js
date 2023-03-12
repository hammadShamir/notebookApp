const express = require("express");
const router = express.Router();
const getUser = require("../../middleware/getUser");
const Notes = require("../../Models/Notes")

router.put("/updatenotes/:id",
    getUser, async (req, res) => {
        // Creating a new Object 
        const { title, description, tag } = req.body;
        const alterNote = {};
        if (title || description || tag) {
            alterNote.title = title;
        }
        if (description) {
            alterNote.description = description;
        }
        if (tag) {
            alterNote.tag = tag;
        }
        // Finding a note to be upadated and update it
        let noteId = await Notes.findById(req.params.id);
        if (!noteId) {
            res.status(404).json("Not Found")
        } else {
            if (noteId.user.toString() !== req.user.id) {
                return res.status(401).json("Unauthorized");
            } else {
                noteId = await Notes.findByIdAndUpdate(req.params.id, { $set: alterNote }, { new: true })
                res.json(noteId)
            }
        }

    })

module.exports = router;