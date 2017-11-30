const mongoose = require('mongoose');
const Listing = mongoose.model('Listing')
const googleMapsClient = require('@google/maps');

module.exports = {
  getAllCords(req, res) {
		Listing.find({}, 'lat lng title', (err, listing) => {
			if (err)
				return res.json(err);

			res.send(listing);
		});
	},
	cords_to_address(req, res) {
		googleMapsClient.createClient({
			key: process.env.GMAPS
		});

		googleMapsClient.geocode({address: req.body.address}, function (err, response) {
            if (err)
                return res.send(err)
                
            res.send(response.json.results[0].geometry.location);
		});
	}
};
