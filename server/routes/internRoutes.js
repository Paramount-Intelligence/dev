const express = require("express");
const {
  createIntern,
  getInterns,
  getInternKpis,
  exportInternReport,
  getInternById,
  updateIntern,
  deleteIntern
} = require("../controllers/internController");

const router = express.Router();

router.route("/").post(createIntern).get(getInterns);
router.get("/kpis", getInternKpis);
router.get("/export", exportInternReport);
router.route("/:id").get(getInternById).put(updateIntern).delete(deleteIntern);

module.exports = router;
