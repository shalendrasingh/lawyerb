const mongoose = require("mongoose");
/**
 * id, name, speciality, firms, address, phone number, and available time.
 */
const lawyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    speciality: {
      type: String,
    },
    firms: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    availableTime: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lawyer", lawyerSchema);
