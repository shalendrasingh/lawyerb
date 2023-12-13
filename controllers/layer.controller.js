require("dotenv").config();
const Lawyer = require("../models/Lawyer.model");

const createLawyer = async (req, res) => {
  try {
    const {
      name,
      speciality,
      firms,
      address,
      phone,
      availableTime,
      isAvailable,
    } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Lawyer name is required",
      });
    }

    let lawyer = new Lawyer({
      name,
      speciality,
      firms,
      address,
      phone,
      availableTime,
      isAvailable,
    });
    await lawyer.save();
    res
      .status(201)
      .json({ message: "Lawyer Added Successfully", lawyer: lawyer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllLawyers = async (req, res) => {
  try {
    const lawyer = await Lawyer.find({}).sort({ createdAt: -1 });
    res.json(lawyer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getLawyerById = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) {
      return res.status(404).json({ error: "Lawyer not found" });
    }
    res.json(lawyer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findByIdAndUpdate(req.params.id, req.body);
    if (!lawyer) {
      return res.status(404).json({ error: "Lawyer not found" });
    }
    const result = await Lawyer.findById(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLawyerSearch = async (req, res) => {
  try {
    const searchParam = req.query.searchParam;
    let query = {};
    if (searchParam) {
      query.$or = [
        { name: { $regex: new RegExp(searchParam, "i") } },
        { speciality: { $regex: new RegExp(searchParam, "i") } },
        { firms: { $regex: new RegExp(searchParam, "i") } },
      ];
    }
    const result = await Lawyer.find(query).sort({ createdAt: -1 });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createLawyer,
  updateLawyer,
  getLawyerById,
  getAllLawyers,
  getLawyerSearch,
};
