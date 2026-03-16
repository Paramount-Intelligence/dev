import express from 'express';
import {
  createIntern,
  getInterns,
  getInternById,
  updateIntern,
  deleteIntern
} from '../controllers/internController.js';

const router = express.Router();

router.route('/')
  .post(createIntern)
  .get(getInterns);

router.route('/:id')
  .get(getInternById)
  .patch(updateIntern)
  .delete(deleteIntern);

export default router;
