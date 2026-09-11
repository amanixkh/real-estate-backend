// Validates the request body for creating an inquiry
function validateInquiry(req, res, next) {
  const { message, property_id } = req.body;
  const errors = [];

  if (!property_id) {
    errors.push("property_id is required");
  } else if (isNaN(Number(property_id))) {
    errors.push("property_id must be a number");
  }

  if (!message) {
    errors.push("message is required");
  } else if (typeof message !== "string" || message.trim().length === 0) {
    errors.push("message must be a non-empty string");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = validateInquiry;
