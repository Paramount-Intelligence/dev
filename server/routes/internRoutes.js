const express = require("express");

const {
  createIntern,
  listInterns,
  getInternById,
  updateIntern,
  deleteIntern
} = require("../controllers/internController");

const router = express.Router();

router.route("/").post(createIntern).get(listInterns);
router.route("/:id").get(getInternById).patch(updateIntern).delete(deleteIntern);

module.exports = router;
