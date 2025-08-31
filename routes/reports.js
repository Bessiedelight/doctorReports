const express = require("express");
const router = express.Router();
const {
  getReports,
  getReportById,
  getReportByHospitalId,
  createReport,
  updateReport,
  deleteReport,
} = require("../controllers/reports");

router.get("/", getReports); // GET /api/reports
router.get("/hospital/:hospitalId", getReportByHospitalId); // GET /api/reports/hospital/:hospitalId
router.get("/:id", getReportById); // GET /api/reports/:id
router.post("/", createReport); // POST /api/reports
router.put("/:id", updateReport); // PUT /api/reports/:id
router.delete("/:id", deleteReport); // DELETE /api/reports/:id

module.exports = router;
