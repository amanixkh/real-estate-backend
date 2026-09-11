const inquiryModel = require("../models/inquiryModel");

const ALLOWED_STATUSES = ["Pending", "Approved", "Rejected"];

// Create a new inquiry
async function sendInquiry(req, res) {
  try {
    const customerId = req.user.id;
    const { property_id, message } = req.body;

    if (!property_id || !message) {
      return res.status(400).json({ message: "property_id and message are required" });
    }

    const inquiry = await inquiryModel.sendInquiry(customerId, property_id, message);
    return res.status(201).json({ message: "Inquiry sent", inquiry });
  } catch (error) {
    console.error("❌ Error sending inquiry:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Get all inquiries
async function getAllInquiries(req, res) {
  try {
    const inquiries = await inquiryModel.getAllInquiries();
    return res.status(200).json({ inquiries });
  } catch (error) {
    console.error("❌ Error fetching inquiries:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Get a single inquiry by id
async function getInquiryById(req, res) {
  try {
    const { id } = req.params;

    const inquiry = await inquiryModel.getInquiryById(id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    return res.status(200).json({ inquiry });
  } catch (error) {
    console.error("❌ Error fetching inquiry:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Update the status of an inquiry
async function updateInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${ALLOWED_STATUSES.join(", ")}` });
    }

    const inquiry = await inquiryModel.updateInquiryStatus(id, status);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    return res.status(200).json({ message: "Inquiry status updated", inquiry });
  } catch (error) {
    console.error("❌ Error updating inquiry status:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Get inquiry statistics
async function getStatistics(req, res) {
  try {
    const statistics = await inquiryModel.getStatistics();
    return res.status(200).json({ statistics });
  } catch (error) {
    console.error("❌ Error fetching statistics:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  sendInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  getStatistics,
};
