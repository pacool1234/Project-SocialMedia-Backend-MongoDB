const express = require('express');
const CommentController = require('../controllers/CommentController');
const { authentication } = require('../middlewares/authentication');
const { uploadCommentImg } = require('../middlewares/upload');
const router = express.Router();

router.post('/create/:postid', authentication, uploadCommentImg.single('image'), CommentController.create);
router.get('/getall', CommentController.getAll);

module.exports = router;