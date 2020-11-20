const handleProfileGet = (req, res, db) => {
	const { id }= req.params;
	// let found = false;
	return db.select('*').from('users').where({id})
		.then(user => {
			// console.log(user[0]);
			if (user.length) {
				res.json(user[0])
			} else {
				res.status(400).json('not found')
			}
			
		})
		.catch(err => res.status(400).json('error getting user'))
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		return res.json(user);
	// 	} 
	// })
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
}

module.exports = {
	handleProfileGet: handleProfileGet
};