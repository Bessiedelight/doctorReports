const Joi = require('joi');
const PatientReport = require('../models/PatientReport');

// Validation schema for creating a report
const reportSchema = Joi.object({
  patientName: Joi.string().required(),
  doctor: Joi.string().allow('').optional(),
  hospitalId: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  symptoms: Joi.string().required(),
  diagnosis: Joi.string().required(),
  followUp: Joi.boolean().required(),
  temperature: Joi.number().optional(),
  bloodPressure: Joi.string().optional(),
  heartRate: Joi.number().optional(),
  medication: Joi.string().optional(),
  instructions: Joi.string().optional(),
});

// Validation schema for updating a report (all fields optional, at least one required)
const updateSchema = Joi.object({
  patientName: Joi.string(),
  doctor: Joi.string().allow(''),
  hospitalId: Joi.string(),
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid('male', 'female', 'other'),
  symptoms: Joi.string(),
  diagnosis: Joi.string(),
  followUp: Joi.boolean(),
  temperature: Joi.number(),
  bloodPressure: Joi.string(),
  heartRate: Joi.number(),
  medication: Joi.string(),
  instructions: Joi.string(),
}).min(1);

// Get all reports with pagination and sorting
const getReports = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || 'patientName';
  const skip = (page - 1) * limit;

  try {
    const reports = await PatientReport.find()
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const total = await PatientReport.countDocuments();
    res.json({
      reports,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single report by ID
const getReportById = async (req, res) => {
  try {
    const report = await PatientReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new report
const createReport = async (req, res) => {
  const { error } = reportSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const report = new PatientReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing report
const updateReport = async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const report = await PatientReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete a report
const deleteReport = async (req, res) => {
  try {
    const report = await PatientReport.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};