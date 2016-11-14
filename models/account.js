/**
 * Created by rande on 11/13/2016.
 */
var mongoose = require('mongoose');

// reference passport-local-mongoose so passport can use this model for user authentication
var plm = require('passport-local-mongoose');

// define the user schema
var AccountSchema = new mongoose.Schema({
    //username: String
    oauthID: String,
    created: String
});

AccountSchema.plugin(plm);

// make it public
module.exports = mongoose.model('Account', AccountSchema);
