const helpers = require("../controllers/serverHelper");

module.exports = function(app) {
    app.route('/users')
        .get(helpers.allUsers)
        .post(helpers.createUser)

    app.route('/users/:id')
        .get(helpers.getUser)
        .put(helpers.updateUser)
        .delete(helpers.deleteUser)
}

/* post test dummy user

{
    username: "janedoe123",
    fullname: "Jane Doe",
    contact: {
        email: "janedoe@email.com",
        phone: "123-456-7890",
    }
}

*/
