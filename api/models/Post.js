const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    excerpt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;