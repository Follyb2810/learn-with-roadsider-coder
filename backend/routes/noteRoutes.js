const express = require('express');
const router = express.Router()
const {getNotes, createNotes, getNoteById, updateNote,deleteNote} = require('../controller/noteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect,getNotes)
router.route('/create').post(protect,createNotes)
router.route('/:id')
                .get(getNoteById)
                .put(protect,updateNote)
                .delete(protect,deleteNote)

module.exports = router