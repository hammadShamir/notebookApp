const express = require("express");
const router = express.Router();
const getUser = require("../../middleware/getUser");
const Notes = require("../../Models/Notes")

router.delete("/deletenotes/:id",
    getUser, async (req, res) => {

        // Finding a note to be deleted and delete it
        let noteId = await Notes.findById(req.params.id);
        if (!noteId) {
            res.status(404).json("Not Found")
        } else {
            if (noteId.user.toString() !== req.user.id) {
                return res.status(401).json("Unauthorized");
            } else {
                noteId = await Notes.findByIdAndDelete(req.params.id);
                res.json({ "Success": "Note has been deleted" })
            }
        }

    })

module.exports = router;