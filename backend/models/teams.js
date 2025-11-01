const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
})

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    approvedByManager: {
        type: String,
        enum: ['not_been_approved', 'approved', 'not_approved', 'no_action_taken'],
        default: 'not_been_approved',
    },
    approvedByDirector: {
        type: String,
        enum: ['not_been_approved', 'approved', 'not_approved', 'no_action_taken'],
        default: 'not_been_approved',
    },
    order: {
        type: Number,
        default: 0,
    },
    members: [memberSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {timestamps: true});

module.exports = mongoose.model('Teams', TeamSchema);