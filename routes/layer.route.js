const express = require("express");
const {
  createLawyer,
  getAllLawyers,
  getLawyerById,
  updateLawyer,
  getLawyerSearch,
} = require("../controllers/layer.controller");

const router = express.Router();

router.post("/addLawyer", createLawyer);

// Get all Lawyer
router.get("/allLawyer", getAllLawyers);
router.get("/lawyerSearch", getLawyerSearch);

// Get a specific Lawyer by ID
router.get("/:id", getLawyerById);

// Update a specific Lawyer by ID
router.patch("/:id", updateLawyer);

module.exports = router;
