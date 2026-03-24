const express = require('express');
const router = express.Router();
const {
  createIntern,
  getInterns,
  getInternById,
  updateIntern,
  deleteIntern,
} = require('../controllers/internController');

router.post('/', createIntern);       // POST   /api/interns
router.get('/', getInterns);          // GET    /api/interns
router.get('/:id', getInternById);    // GET    /api/interns/:id
router.patch('/:id', updateIntern);   // PATCH  /api/interns/:id
router.delete('/:id', deleteIntern);  // DELETE /api/interns/:id

module.exports = router;
