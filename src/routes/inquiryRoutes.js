const express = require("express");
const router = express.Router();

const inquiryController = require("../controllers/inquiryController");
const { authenticate } = require("../middleware/authMiddleware");
const validateInquiry = require("../middleware/inquiryValidator");

router.post("/inquiries", authenticate, validateInquiry, inquiryController.sendInquiry);
router.get("/inquiries", authenticate, inquiryController.getAllInquiries);
router.get("/inquiries/:id", authenticate, inquiryController.getInquiryById);
router.patch("/inquiries/:id/status", authenticate, inquiryController.updateInquiryStatus);
router.get("/statistics", authenticate, inquiryController.getStatistics);

module.exports = router;
