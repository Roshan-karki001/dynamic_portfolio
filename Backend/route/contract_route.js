const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadConfig');
const { authenticateToken } = require('../midware/authMiddleware');
const { 
    getAllContracts,
    getContractById,
    postNewContract,
    editContract,
} = require('../controller/contract_controller');

// Ensure uploads directory exists
const fs = require('fs');

const dir = './uploads/images';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Routes
router.post("/", authenticateToken, postNewContract);
 // Move search before /:id
router.get("/", authenticateToken, getAllContracts);
router.get("/:id", authenticateToken, getContractById);
router.put("/:id", authenticateToken, editContract);
// router.delete("/:id", authenticateToken, deleteContract);
// router.post("/:id/sign", authenticateToken, upload.single('signature'), signContract);

module.exports = router;
