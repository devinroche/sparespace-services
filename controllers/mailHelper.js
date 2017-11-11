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
			to: user.contact.email,
			subject: 'Verify your account',
			template: 'verify',
			context: {
					u: user
			}
		}

		smtpTransport.sendMail(mailOptions, (error, response) => {
			if(error){
				console.log('[ERROR] Message NOT sent: ', error);
				success = false;
			  }
			  else {
				console.log('[INFO] Message Sent: ' + response.message);
			  }
			  

			return error, response
		});
	},
	expressInterest(renter, host, listing){
		const mailOptions = {
				replyTo: renter.contact.email,
				to: host.contact.email,
				subject: 'bruh show me ur shit!',
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
