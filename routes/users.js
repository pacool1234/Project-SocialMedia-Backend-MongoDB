const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');
const { uploadUserImg } = require('../middlewares/upload');
const router = express.Router();

router.post('/create', uploadUserImg.single('image'), UserController.create);
router.get('/confirm/:emailToken', UserController.confirm);
router.post('/login', UserController.login); // Paco: changed from PUT to POST so html form can be done
router.put('/logout', authentication, UserController.logout);
router.put('/update', uploadUserImg.single('image'), authentication, UserController.update);
router.get('/getall', UserController.getAll);
router.get('/getbyid/:_id', UserController.getById);
router.get('/getbyusername/:username', UserController.getByUsername);
router.delete('/delete', authentication, UserController.delete);
router.put('/follow/:targetid', authentication, UserController.follow);
router.put('/unfollow/:targetid', authentication, UserController.unfollow);


module.exports = router;