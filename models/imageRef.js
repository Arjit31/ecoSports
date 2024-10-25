const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('image', imageSchema);