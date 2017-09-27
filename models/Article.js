const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,    
    },
    experience: {
        type: String,
    },
    link: {
        type: String,
    }, 
    saved: {
        type: Boolean,
        default: false
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;