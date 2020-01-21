const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PointSchema = require('./utils/PointSchema');

const DevSchema = new Schema({
    nomeCompleto: {
        type: String
    },
    github_user: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String
    },
    techs: {
        type: [String]
    },
    bio: {
        type: String
    },
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model('devs' , DevSchema);