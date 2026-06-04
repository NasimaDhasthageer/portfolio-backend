const express = require("express");
const router = express.Router();
const Project = require("../models/Project");


// CREATE project
router.post("/", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET single project
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// DELETE project
router.delete("/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;