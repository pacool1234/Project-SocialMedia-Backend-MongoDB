const express = require('express');
const PostController = require('../controllers/PostController');
const router = express.Router();
const { authentication, isAuthor } = require('../middlewares/authentication');


router.post('/create', authentication, PostController.create);
router.put('/update/:_id', authentication, isAuthor, PostController.update);
router.delete('/delete/:_id', authentication, isAuthor, PostController.delete);
router.get('/getAll', PostController.getAll)
router.get('/getById/:_id', PostController.getbyId)


module.exports = router;


