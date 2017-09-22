var mongoose = require('mongoose');
var db = require('../config/database');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text: {
        type: String
    }
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;