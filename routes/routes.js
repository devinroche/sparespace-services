const userHelper = require('../controllers/userHelper');
const mapsHelper = require('../controllers/mapsHelper');
const listHelper = require('../controllers/listingHelper');
const msgHelper = require('../controllers/messageHelper');

module.exports = function (app) {
	app.route('/users')
		.get(userHelper.allUsers)
		.post(userHelper.createUser);

	app.route('/user/:id')
		.get(userHelper.getUser)
		.put(userHelper.updateUser)
		.delete(userHelper.deleteUser);

	app.route('/login')
		.post(userHelper.loginUser);

	app.route('/verify/:id')
		.get(userHelper.verifyUser);

	app.route('/cordinates')
		.get(mapsHelper.getAllCords)
		.post(mapsHelper.cordsToAddress);

	app.route('/listings')
		.get(listHelper.allListings)
        .post(listHelper.newListing);

    app.route('/listing/:id')
        .get(listHelper.listingDetails)
        .put(listHelper.updateListing)
        .delete(listHelper.deleteListing);

	//These are for testing.
	app.route('/deleteListings')
		.delete(listHelper.clearAll);

	app.route('/deleteUsers')
		.delete(userHelper.clearAll);
        
	app.route('/message')
		.post(msgHelper.newMessage);
        
	app.route('/messages/:id')
		.get(msgHelper.getConversations);

	app.route('/message/:host/:renter')
		.get(msgHelper.allMessages)

	app.route('/allMsg')
		.get(msgHelper.allMSG)

	//filter requests
	app.route('/most_recent')
		.get(listHelper.most_recent)
	app.route('/least_recent')
		.get(listHelper.least_recent)
	app.route('/cost_high')
		.get(listHelper.cost_high)
	app.route('/cost_low')
		.get(listHelper.cost_low)
	app.route('/range')
		.post(listHelper.range_point)
	
};
