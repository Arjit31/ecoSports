const mongoose = require('mongoose');

const batchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coachId: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    users: {
        type:[String]
    }
})

module.exports = mongoose.model('batch', batchSchema);