const express = require('express');
const router = express.Router();
const {
  createIntern,
  getInterns,
  getInternById,
  updateIntern,
  deleteIntern,
} = require('../controllers/internController');

router.route('/').get(getInterns).post(createIntern);
router.route('/:id').get(getInternById).put(updateIntern).delete(deleteIntern);

module.exports = router;
