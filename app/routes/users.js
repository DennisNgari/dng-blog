const express = require('express');
const router = express.Router();

const { signUp, login } = require('../controllers/users');

// Add Middleware Here so that only admin user can sign up new authors
router.post('/signup', signUp);

router.post('/login', login);

module.exports = router;
