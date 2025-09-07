const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../midware/authMiddleware');
const {
    getAllAbouts,
  createAbout,
  updateAbout,
  deleteAbout,
} = require("../controller/aboutController");


router.post("/create",authenticateToken, createAbout);
router.get("/",authenticateToken, getAllAbouts);
router.put("/update/:id", authenticateToken,updateAbout);
router.delete("/delete/:id",authenticateToken, deleteAbout);

module.exports = router;
