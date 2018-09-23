const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Topic = require('./topic');
const Resource = require('./resources');

const SubTopicSchema = new Schema({
    topic_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Topic
    },
    title: {
        type: String,
        required: true
    },
    resources: [{
        type: Schema.Types.ObjectId,
        ref: Resource
    }],
    percentage_concluded: Number
});

const SubTopic = mongoose.model('SubTopic', SubTopicSchema);

module.exports =  SubTopic;