/**
 * Created by rande on 11/14/2016.
 */
var mongoose = require('mongoose');

// define the class using a mongoose schema
var carSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'No Company Name entered'
    },
    model: {
        type: String,
        required: 'No model name entered'
    },
    engine: {
        type: String,
        required: 'No engine size entered'
    },
    year: {
        type: Number,
        required: 'No build year entered'
    }
});

// make the class definition public as "cars"
module.exports = mongoose.model('Cars', carSchema);