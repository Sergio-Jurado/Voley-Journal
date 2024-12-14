const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    idLeague: { type: mongoose.Schema.Types.ObjectId, ref: 'League' },
});

module.exports = mongoose.model('Article', articleSchema);