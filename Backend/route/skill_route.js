const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../midware/authMiddleware");
const {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controller/skillController");

router.post("/create", authenticateToken, createSkill);
router.get("/", getAllSkills);
router.get("/:id", authenticateToken, getSkillById);
router.put("/update/:id", authenticateToken, updateSkill);
router.delete("/delete/:id", authenticateToken, deleteSkill);

module.exports = router;
