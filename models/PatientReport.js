const mongoose = require('mongoose');

const PatientReportSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctor: { type: String, required: false },
  hospitalId: { type: String, required: true }, // Using hospitalId as per provided model
  dateOfBirth: { type: Date, required: true },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  followUp: { type: Boolean, required: true },
  temperature: { type: Number, required: false },
  bloodPressure: { type: String, required: false },
  heartRate: { type: Number, required: false },
  medication: { type: String, required: false },
  instructions: { type: String, required: false },
}, {
  timestamps: true // Auto-add createdAt and updatedAt
});

module.exports = mongoose.models.PatientReport || mongoose.model('PatientReport', PatientReportSchema);