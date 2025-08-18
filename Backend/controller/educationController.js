const { Education } = require("../models/alldatabase");

// 1. Get all education entries for the logged-in user
const getAllEducations = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const educations = await Education.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: educations.length,
      educations,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Get a single education entry by its ID
const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ success: false, message: "Education entry not found" });
    }

    if (education.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, education });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Create a new education entry
const createEducation = async (req, res) => {
  try {
    const { degree, School, year, gpa, description, is_active } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const newEducation = new Education({
      userId: req.user.id,
      degree,
      School,
      year,
      gpa,
      description,
      is_active: is_active ?? true,
    });

    await newEducation.save();

    res.status(201).json({
      success: true,
      message: "Education entry created successfully",
      education: newEducation,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Update an education entry by ID
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ success: false, message: "Education entry not found" });
    }

    if (education.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { degree, School, year, gpa, description, is_active } = req.body;

    education.degree = degree ?? education.degree;
    education.School = School ?? education.School;
    education.year = year ?? education.year;
    education.gpa = gpa ?? education.gpa;
    education.description = description ?? education.description;
    if (typeof is_active === "boolean") education.is_active = is_active;

    await education.save();

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      education,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 5. Delete education by ID
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ success: false, message: "Education entry not found" });
    }

    if (education.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await education.deleteOne();

    res.status(200).json({ success: true, message: "Education entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
