const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.post('/create', UserController.create);
router.get('/confirm/:emailToken', UserController.confirm);
router.put('/login', UserController.login);
router.get('/getall', UserController.getAll);
router.delete('/deleteall', UserController.deleteAll);

module.exports = router;