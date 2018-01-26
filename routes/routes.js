const helpers = require('../controllers/userHelper');
const mapsHelper = require('../controllers/mapsHelper');
const listHelper = require('../controllers/listingHelper');
const msgHelper = require('../controllers/messageHelper');

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

	app.route('/cordinates')
		.get(mapsHelper.getAllCords)
		.post(mapsHelper.cords_to_address);

	app.route('/listings')
		.get(listHelper.allListings)
		.post(listHelper.newListing);

	app.route('/listing/:id')
		.get(listHelper.listingDetails);

	app.route('/p2p')
		.post(listHelper.sendInterest);
        
    app.route('/getinterested/')
        .post(listHelper.getUsersInterest)

	//These are for testing.
	app.route('/deleteListings')
		.delete(listHelper.clearAll);

	app.route('/deleteUsers')
        .delete(helpers.clearAll);
        
    app.route('/message')
        .post(msgHelper.newMessage);
        
    app.route('/messages/:id')
        .get(msgHelper.getConversations);

    app.route('/message/:host/:renter')
        .get(msgHelper.allMessages)

    app.route('/allMsg')
        .get(msgHelper.allMSG)
};
