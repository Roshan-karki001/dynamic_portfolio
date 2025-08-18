const { About, Education } = require("../models/alldatabase");

// Get all About documents for the authenticated user
const getAllAbouts = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Authentication failed: No user data found" });
    }

    // Fetch About sections
    const abouts = await About.find({ userId: req.user.id })
      .populate("education") // Optional if you want only those linked in about.education
      .sort({ createdAt: -1 });

    // Fetch all education entries for the same user (completely independent of About.education)
    const educations = await Education.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      abouts,
      educations, // separate education list
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// Create a new About section (without education)
const createAbout = async (req, res) => {
  try {
    const { Mystory, Achievement, Intrest_Hobbies } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User ID is missing" });
    }

    const about = new About({
      userId: req.user.id,
      Mystory,
      Achievement,
      Intrest_Hobbies,
      education: [],
    });

    await about.save();

    res.status(201).json({
      success: true,
      message: "About section created successfully",
      about,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update About section
const updateAbout = async (req, res) => {
  try {
    const { Mystory, Achievement, Intrest_Hobbies } = req.body;

    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ success: false, message: "About not found" });

    if (about.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    about.Mystory = Mystory || about.Mystory;
    about.Achievement = Achievement || about.Achievement;
    about.Intrest_Hobbies = Intrest_Hobbies || about.Intrest_Hobbies;

    await about.save();

    const updatedAbout = await About.findById(about._id).populate("education");

    res.status(200).json({ success: true, message: "About updated successfully", about: updatedAbout });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete About section and related education entries
const deleteAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ success: false, message: "About not found" });

    if (about.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await Education.deleteMany({ aboutId: about._id });
    await about.deleteOne();

    res.status(200).json({ success: true, message: "About and related education entries deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllAbouts,
  createAbout,
  updateAbout,
  deleteAbout,
};
