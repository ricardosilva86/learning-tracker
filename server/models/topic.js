const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaintTopic = require('./maintopic');
const SubTopic = require('./subtopic');

const TopicSchema = new Schema({
    maintopic_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: MaintTopic
    },
    title: {
        type: String,
        required: true
    },
    subtopics: [{type: Schema.Types.ObjectId, ref: SubTopic}],
    percentage_concluded: Number
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;