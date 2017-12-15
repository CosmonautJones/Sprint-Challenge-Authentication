const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
	// there should be a user object set on req
	// use that req.user object to create a user and save it to our Mongo instance.
	req.user.save((err, newUser) => {
		if (err) {
			res.status(422);
			res.json({ 'Need both username/PW fields': err.message });
			return;
		}
		res.json(newUser);
	});
};

module.exports = {
	createUser
};
