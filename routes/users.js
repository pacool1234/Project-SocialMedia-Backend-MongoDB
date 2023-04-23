const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');
const router = express.Router();

router.post('/create', UserController.create);
router.get('/confirm/:emailToken', UserController.confirm);
router.put('/login', UserController.login);
router.put('/logout', authentication, UserController.logout);
router.get('/getall', UserController.getAll);
router.get('/getbyid', UserController.getById);
router.delete('/deleteall', UserController.deleteAll); // just for dev purposes, won't make it to production

module.exports = router;