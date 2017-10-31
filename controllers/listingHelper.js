const mongoose = require('mongoose')
const mailHelper = require('./mailHelper')
const User = mongoose.model('User')
const Listing = mongoose.model('Listing')


module.exports = {
    newListing(req, res) {
        req.body._host = mongoose.Types.ObjectId(req.body._host);
        var newListing = new Listing(req.body)
        newListing.save(function (err, listing) {
            if(err)
                res.json(err);

            res.send(listing);
        });
    },
    allListings(req, res){
        Listing.find({}, function (err, listing) {
            if (err)
                res.json(err);

            res.send(listing);
        })
    },
    listingDetails(req, res){
        Listing
            .findById(req.params.id)
            .populate({ path: '_host', model: User })
            .exec(function(err, list) { 
                if (err)
                        res.json(err);
                        
                res.send(list);
            });
    }
}
