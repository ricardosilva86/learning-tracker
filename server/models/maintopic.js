const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Topic = require("./topic");

const MainTopicSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	topics: [{
		type: Schema.Types.ObjectId,
		ref: Topic
	}],
	percentage_concluded: Number
});

const MainTopic = mongoose.model("MainTopic", MainTopicSchema);

module.exports = MainTopic;