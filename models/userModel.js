const mongoose = require('mongoose')

const favouriteSchema = mongoose.Schema({
    id: String
})
const wishlistSchema = mongoose.Schema({
    id: String
})

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favourite: {
        type: [String]
    },
    wishlist: {
        type: [String]
    }

})

module.exports = mongoose.model('user', userSchema)