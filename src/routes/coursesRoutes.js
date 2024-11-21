// src/routes/certificatesRoutes.js
const express = require("express");
const Course = require("../../models/Course.js")

const router = express.Router();

router.get("/:courseCode", async (req, res) => {
    try {
        const course = await Course.findOne({ courseCode: req.params.courseCode });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
})

module.exports = router;