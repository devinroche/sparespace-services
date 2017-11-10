const nodemailer = require('nodemailer');
require('dotenv').config()

let smtpTransport = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
});

module.exports = {
	verifyEmail(email, userId) {
		const mailOptions = {
			to: email,
			subject: 'Sparespace Verification',
			text: 'fart',
			html: `<p>Click <a href='http://localhost:3001/verify/${userId}'>Here</a> to verify your account</p>`,
		};

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
	expressInterest(host, renter, listing){
		const mailOptions = {
			replyTo: renter,
			to: host,
			subject: 'bruh show me ur shit!',
			text: 'fart',
			html: `
			<div>
			<p>yo dawg i lyke ur space! (you can reply directly to this email #turnt)</p>
			<ul>
				<li>${listing.title}</li>
				<li>${listing.price}</li>
				<li>${listing.description}</li>
			</ul>
			</div>`,
		};

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
	}
};