const { Skill } = require("../models/alldatabase");

// 1. Get all skills for the authenticated user
const getAllSkills = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const skills = await Skill.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Get a single skill by ID
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    if (skill.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, skill });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Create a new skill
const createSkill = async (req, res) => {
  try {
    const { title, level, category, Certificate, tools_technology, currently_learning } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const newSkill = new Skill({
      userId: req.user.id,
      title,
      level,
      category,
      Certificate,
      tools_technology,
      currently_learning: currently_learning ?? false,
    });

    await newSkill.save();

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill: newSkill,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Update a skill by ID
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    if (skill.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { title, level, category, Certificate, tools_technology, currently_learning } = req.body;

    skill.title = title ?? skill.title;
    skill.level = level ?? skill.level;
    skill.category = category ?? skill.category;
    skill.Certificate = Certificate ?? skill.Certificate;
    skill.tools_technology = tools_technology ?? skill.tools_technology;
    if (typeof currently_learning === "boolean") skill.currently_learning = currently_learning;

    await skill.save();

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 5. Delete a skill by ID
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    if (skill.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await skill.deleteOne();

    res.status(200).json({ success: true, message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
