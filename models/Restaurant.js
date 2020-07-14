const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp'); 

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
})

restaurantSchema.plugin(timestamp);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;