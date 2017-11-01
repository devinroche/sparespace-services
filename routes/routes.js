const helpers = require('../controllers/userHelper');
const listHelper = require('../controllers/listingHelper');

module.exports = function (app) {
	app
		.route('/users')
		.get(helpers.allUsers)
		.post(helpers.createUser);

	app
		.route('/user/:id')
		.get(helpers.getUser)
		.put(helpers.updateUser)
		.delete(helpers.deleteUser);

	app.route('/login').post(helpers.loginUser);

	app.route('/verify/:email').get(helpers.verifyUser);

	app.route('/marker').post(helpers.getCords);

	app
		.route('/u/listing')
		.get(listHelper.allListings)
		.post(listHelper.newListing);

	app.route('/u/listing/:id').get(listHelper.listingDetails);
};
