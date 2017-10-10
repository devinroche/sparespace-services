const helpers = require("../controllers/serverHelper");

module.exports = function(app) {
    app.route('/users')
        .get(helpers.allUsers)
        .post(helpers.createUser)

    app.route('/users/:id')
        .get(helpers.getUser)
        .put(helpers.updateUser)
        .delete(helpers.deleteUser)

    app.route('/login')

    app.route('/verify/:id')
    	.get(helpers.verify_user)
        .post(helpers.loginUser)

    app.route('/send')
        .get(helpers.sendEmailVerify)
}
