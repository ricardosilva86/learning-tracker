const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubTopic = require("./subtopic");

const ResourceSchema = new Schema({
	subtopic_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: SubTopic
	},
	title: String,
	link: String,
	concluded: Boolean
});

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;