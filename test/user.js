const User = require('../models/userModel');

// Require the dev-dependencies
const bcrypt = require('bcrypt');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
	beforeEach((done) => {
		User.remove({}, (err) => {
			done();
		});
	});

	describe('/GET users', () => {
		it('it should GET all the users', (done) => {
			chai
				.request(server)
				.get('/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
				done();
				});
		});
	});

	describe('/POST users', () => {
		it('it should NOT POST a user without password field', (done) => {
			const user = {
				fullname: 'Devin Roche',
				contact: {
					email: 'foo@email.com',
					phone: '123-456-7890',
				},
				userType: 'host',
			};

			chai
				.request(server)
				.post('/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('password');
					res.body.errors.password.should.have.property('kind').eql('required');
				done();
				});
		});

		it('it should  POST a new user', (done) => {
			const user = {
				fullname: 'Devin Roche',
				password: 'fart',
				contact: {
					email: 'foo@email.com',
					phone: '123-456-7890',
				},
				userType: 'host'
			};

			chai
				.request(server)
				.post('/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('fullname');
					res.body.should.have.property('password');
					res.body.should.have.property('contact');
					res.body.should.have.property('userType');
				done();
				});
		});
	});

	describe('/GET/:id user', () => {
		it('it should GET a user by the given id', (done) => {
			const user = new User({
				fullname: 'Devin Roche',
				password: 'fart',
				contact: {
					email: 'foo@email.com',
					phone: '123-456-7890',
				},
				userType: 'host',
			});

			user.save((err, user) => {
				chai
					.request(server)
					.get(`/user/${user.id}`)
					.send(user)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('fullname');
						res.body.should.have.property('password');
						res.body.should.have.property('contact');
						res.body.contact.should.have.property('email');
						res.body.contact.should.have.property('phone');
						res.body.should.have.property('userType');
						res.body.should.have.property('_id').eql(user.id);
					done();
					});
			});
		});
	});

	describe('/PUT/:id user', () => {
		it('it should UPDATE a user given the id', (done) => {
			const user = new User({
				fullname: 'Devin Roche',
				password: 'fart',
				contact: {
					email: 'foo@email.com',
					phone: '123-456-7890',
				},
				userType: 'host',
			});
			user.save((err, book) => {
				chai
					.request(server)
					.put(`/user/${user.id}`)
					.send({
						fullname: 'Devin Roche',
						password: 'poop',
						contact: {
							email: 'foo@email.com',
							phone: '123-456-7890',
						},
						userType: 'host',
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message').eql('user updated');
						res.body.user.should.have.property('password').eql('poop');
					done();
					});
			});
		});
	});

	describe('/DELETE/:id user', () => {
		it('it should DELETE a user given the id', (done) => {
			const user = new User({
				fullname: 'Devin Roche',
				password: 'fart',
				contact: {
					email: 'foo@email.com',
					phone: '123-456-7890',
				},
				userType: 'host',
			});
			user.save((err, user) => {
				chai
					.request(server)
					.delete(`/user/${user.id}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.user.should.have.property('ok').eql(1);
						res.body.user.should.have.property('n').eql(1);
					done();
					});
			});
		});
	});

	describe('/LOGIN/ user', () => {
		it('it should LOGIN a user given the email and password', (done) => {
			const user = new User({
				fullname: 'Devin Roche',
				password: 'fart',
				contact: {
					email: 'fart@email.com',
					phone: '123-456-7890',
				},
				userType: 'host',
			});
			user.save((err, user) => {
				chai
					.request(server)
					.post(`/login`)
					.send({
						email: 'fart@email.com',
						password: 'fart'
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.true;
					done();
					});
			});
		});
	});

	describe('/VERIFY/ user', () => {
		it('it should verify a user', (done) => {
			const user = new User({
				fullname: 'Devin Roche',
				password: 'fart',
				contact: {
					email: 'fart@email.com',
					phone: '123-456-7890',
				},
				userType: 'host',
			});
			user.save((err, user) => {
				chai
					.request(server)
					.get(`/verify/${user.contact.email}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message').eql('account verified')
						res.body.user.should.have.property('fullname').eql('Devin Roche')
						res.body.user.should.have.property('userType').eql('host')
						res.body.user.contact.should.have.property('email').eql('fart@email.com')
						res.body.user.contact.should.have.property('phone').eql('123-456-7890')
					done();
					});
			});
		});
	});
});

