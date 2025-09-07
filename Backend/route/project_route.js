const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../midware/authMiddleware');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
} = require("../controller/projectController");


router.post("/create",authenticateToken, createProject);
router.get("/", getAllProjects);
router.get("/:id",authenticateToken, getProjectById);
router.put("/update/:id", authenticateToken,updateProjectById);
router.delete("/delete/:id",authenticateToken, deleteProjectById);

module.exports = router;
