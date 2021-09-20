const mongoose = require('mongoose');

const WilderSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
        required: true,
        unique: true
    },
    skills: [{
        title: String,
        votes: Number
    }
    ],
    date: {
        type: Date,
    }
});

WilderSchema.index({ name: "text", city: "text" })

module.exports = mongoose.model('wilder', WilderSchema);