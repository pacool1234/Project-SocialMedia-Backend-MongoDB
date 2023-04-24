const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');
const router = express.Router();

router.post('/create', UserController.create);
router.get('/confirm/:emailToken', UserController.confirm);
router.put('/login', UserController.login);
router.put('/logout', authentication, UserController.logout);
router.put('/update', authentication, UserController.update);
router.get('/getall', UserController.getAll);
router.get('/getbyid', UserController.getById);
router.delete('/delete/:_id', UserController.deleteById);

module.exports = router;