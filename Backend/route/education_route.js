const express = require("express");
const router = express.Router();
const {getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,} = require("../controller/educationController");
const { authenticateToken } = require('../midware/authMiddleware');

router.get("/",getAllEducations);
router.get("/:id",authenticateToken, getEducationById);
router.post("/",authenticateToken, createEducation);
router.put("/:id",authenticateToken, updateEducation);
router.delete("/:id",authenticateToken, deleteEducation);

module.exports = router;
