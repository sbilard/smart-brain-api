const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission')
	}
	db.select('email','hash').from('login')
		.where('email','=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users')
					.where('email','=', email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
	// bcrypt.compare("apples", '$2a$10$epZeoIQuqspU1/HPv4yodeGtybJapHhztGphx62RfYsBgY4IZDCei', function(err, res) {
	//     console.log('first guess', res);
	// });
	// bcrypt.compare("veggies", '$2a$10$epZeoIQuqspU1/HPv4yodeGtybJapHhztGphx62RfYsBgY4IZDCei', function(err, res) {
	//     console.log('second guess', res);
	// });
	// if (req.body.email === database.users[0].email &&
	// 	req.body.password === database.users[0].password) {
	// 	// res.json('success');
	// 	res.json(database.users[0]);
	// } else {
	// 	res.status(400).json('error logging in');
	// }
	// res.json('signin');
}

module.exports = {
	handleSignin: handleSignin
};