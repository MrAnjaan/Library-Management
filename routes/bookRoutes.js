const express = require('express');
const router = express.Router();

const controller = require('../controllers/bookController');

router.get('/',controller.serveBooksPage);
router.post('/add',controller.addNewBook);
router.get('/display',controller.getAllBooks);
router.get('/display/:id',controller.getBookById);
router.get('/author/:authorid',controller.getAllBooksByAuthorId);
router.put('/update/:id',controller.updateBookById);
router.delete('/delete/:id',controller.deleteBookById);

module.exports = router;