const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/internController");

router.post("/", ctrl.createIntern);
router.get("/", ctrl.getInterns);
router.get("/:id", ctrl.getInternById);
router.patch("/:id", ctrl.updateIntern);
router.delete("/:id", ctrl.deleteIntern);

module.exports = router;