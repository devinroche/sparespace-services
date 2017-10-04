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
        .post(helpers.loginUser)
}
