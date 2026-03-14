const express = require('express');
const {
    getInterns,
    getIntern,
    createIntern,
    updateIntern,
    deleteIntern,
} = require('../controllers/internController');

const router = express.Router();

router.route('/')
    .get(getInterns)
    .post(createIntern);

router.route('/:id')
    .get(getIntern)
    .patch(updateIntern)
    .delete(deleteIntern);

module.exports = router;
