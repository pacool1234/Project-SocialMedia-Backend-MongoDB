const express = require('express');
const CommentController = require('../controllers/CommentController');
const { authentication } = require('../middlewares/authentication');
const router = express.Router();

router.post('/create', authentication, CommentController.create);
router.get('/getall', CommentController.getAll);

module.exports = router;