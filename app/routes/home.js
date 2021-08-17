const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
	res.json({ message: 'Welcome to the Blog Backend.' });
});

module.exports = router;
