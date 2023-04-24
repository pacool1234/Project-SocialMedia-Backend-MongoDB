const express = require('express');
const PostController = require('../controllers/PostController');
const router = express.Router();
const { authentication, isAuthor } = require('../middlewares/authentication');
const {uploadPostImg} = require('../middlewares/upload');


router.post('/create', authentication, uploadPostImg.single('image'), PostController.create);
router.put('/update/:_id', authentication,uploadPostImg.single('image'), isAuthor, PostController.update);
router.delete('/delete/:_id', authentication, isAuthor, PostController.delete);
router.get('/getAll', PostController.getAll);
router.get('/getById/:_id', PostController.getById);
router.get('/getByTitle/:title', PostController.getByTitle);
router.get('/likePost/:_id', authentication, PostController.likePost)


module.exports = router;


