async function signUp(req, res) {
	return res.status(201).json({
		message: 'Author Created',
		body: 'Author Body',
	});
}

async function login(req, res) {
	return res.status(200).json({
		message: 'Login Sucess',
		body: 'Author Body + Token',
		// You can return token on header
	});
}

module.exports = {
	login,
	signUp,
};
