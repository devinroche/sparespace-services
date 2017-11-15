const helpers = require('../controllers/userHelper');
const listHelper = require('../controllers/listingHelper');

module.exports = function (app) {
	app.route('/users')
		.get(helpers.allUsers)
		.post(helpers.createUser);

	app.route('/user/:id')
		.get(helpers.getUser)
		.put(helpers.updateUser)
		.delete(helpers.deleteUser);

	app.route('/login')
		.post(helpers.loginUser);

	app.route('/verify/:id')
		.get(helpers.verifyUser);

	app.route('/marker')
		.post(helpers.getCords);

	app.route('/listings')
		.get(listHelper.allListings)
		.post(listHelper.newListing);

	app.route('/listing/:id')
		.get(listHelper.listingDetails);

	app.route('/p2p')
		.post(listHelper.sendInterest);

	app.route('/resend')
		.post(helpers.resendVerification)
	//These are for testing.
	app.route('/deleteListings')
		.delete(listHelper.clearAll);

	app.route('/deleteUsers')
		.delete(helpers.clearAll);
};
