const express = require('express');
const router = express.Router();
const { 
  getAllInterns, 
  createIntern, 
  getInternById,
  updateIntern, 
  deleteIntern 
} = require('../controllers/internController');

router.route('/')
  .get(getAllInterns)
  .post(createIntern);

router.route('/:id')
  .get(getInternById)
  .patch(updateIntern)
  .delete(deleteIntern);

module.exports = router;