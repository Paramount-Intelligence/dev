const express = require('express');
const router = express.Router();
const {
  getAllInterns,
  getInternById,
  createIntern,
  updateIntern,
  deleteIntern,
} = require('../controllers/internController');

router.get('/', getAllInterns);
router.get('/:id', getInternById);
router.post('/', createIntern);
router.patch('/:id', updateIntern);
router.delete('/:id', deleteIntern);

module.exports = router;