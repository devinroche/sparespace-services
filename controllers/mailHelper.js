const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config()

let smtpTransport = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
});

const options = {
	viewEngine: {
		extname: '.hbs',
		layoutsDir: 'views/',
	},
	viewPath: 'views/',
	extName: '.hbs'
};

smtpTransport.use('compile', hbs(options));

module.exports = {
	verifyEmail(user) {
		const mailOptions = {
			to: user.email,
			subject: 'Verify your account',
			template: 'verify',
			context: {
					u: user
			}
		}

		smtpTransport.sendMail(mailOptions, (error, response) => {
			return error, response
		});
	},
	expressInterest(host, renter, listing){
		const mailOptions = {
				replyTo: renter.email,
				to: host.email,
				subject: 'Lets talk storage!',
				template: 'interest',
				context: {
						l: listing,
						h: host
				}
		}

		smtpTransport.sendMail(mailOptions, (error, response) => {
			return error, response
		});
	}
};
