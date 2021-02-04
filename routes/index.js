const { Router } = require('express');
const { UserController, AuthController } = require('../controllers/');
const auth = require('../middleware/auth');

const router = Router();

router.get('/users', /* auth, */ UserController.getAllUsers);

router.post('/users', UserController.createUser);

router.post('/login', AuthController.login);

module.exports = router;
