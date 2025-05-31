const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/tokenvarification');

const controller = require('../controllers/authorController');

// router.get('/',controller.serveAuthorsPage);
router.get('/add',verifyToken,controller.serveAddAuthorPage);
router.post('/add',verifyToken,controller.addNewAuthor);
router.get('/',verifyToken,controller.getAllAuthors);
router.get('/get/:id',verifyToken,controller.getAuthorById);
router.get('/update/:id',verifyToken,controller.updateAuthorById);

module.exports = router;