const { Project } = require("../models/alldatabase");

// Create a new project
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      longDescription,
      image,
      tech,
      category,
      github,
      Date,
      Team,
      Highlights
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User ID is missing" });
    }

    const newProject = new Project({
      userId: req.user.id,
      title,
      description,
      longDescription,
      image,
      tech,
      category,
      github,
      Date,
      Team,
      Highlights
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all projects for the authenticated user
const getAllProjects = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
    }

    const projects = await Project.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({
      success: true,
      project
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a project by ID
const updateProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const {
      title,
      description,
      longDescription,
      image,
      tech,
      category,
      github,
      Date,
      Team,
      Highlights,
      status,
      is_active
    } = req.body;

    // Update only provided fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (longDescription) project.longDescription = longDescription;
    if (image) project.image = image;
    if (tech) project.tech = tech;
    if (category) project.category = category;
    if (github) project.github = github;
    if (Date) project.Date = Date;
    if (Team) project.Team = Team;
    if (Highlights) project.Highlights = Highlights;
    if (status) project.status = status;
    if (typeof is_active === "boolean") project.is_active = is_active;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a project by ID
const deleteProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
};
