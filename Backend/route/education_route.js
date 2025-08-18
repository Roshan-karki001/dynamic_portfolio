const express = require("express");
const router = express.Router();
const {getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,} = require("../controllers/educationController");
const authMiddleware = require("../middleware/auth"); 

router.use(authMiddleware); // protect all routes

router.get("/",authenticateToken,getAllEducations);
router.get("/:id",authenticateToken, getEducationById);
router.post("/",authenticateToken, createEducation);
router.put("/:id",authenticateToken, updateEducation);
router.delete("/:id",authenticateToken, deleteEducation);

module.exports = router;
