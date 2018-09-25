const MainTopic = require("../models/maintopic");
const Topic = require("../models/topic");
const SubTopic = require("../models/subtopic");
const Resources = require("../models/resources");

module.exports = {
	index(req, res) {
		res.send({ hi: "there" });
	},
	getMainTopic(req, res, next){
		const mainTopicId = req.params.id;
		MainTopic.findById({_id: mainTopicId})
			.populate({
				path:"topics", 
				model: Topic,
				populate: {
					path: "subtopics",
					model: SubTopic,
					populate: {
						path: "resources",
						model: Resources
					}
				}
			})
			.then(maintopic => {
				res.send(maintopic);
			})
			.catch(next);
	},
	getTopic(req, res, next){
		const topicId = req.params.id;
		Topic.findById({_id: topicId})
			.populate({
				path: "subtopics",
				model: SubTopic,
				populate: {
					path: "resources",
					model: Resources
				}
			})
			.then(topic => {
				res.send(topic);
			})
			.catch(next);
	},
	getSubTopic(req, res, next){
		const subTopicId = req.params.id;
		SubTopic.findById({_id: subTopicId})
			.populate({
				path: "resources",
				model: Resources
			})
			.then(subtopic => {
				res.send(subtopic);
			})
			.catch(next);
	},
	getResource(req, res, next){
		const resourceId = req.params.id;
		Resources.findById({_id: resourceId})
			.then(subtopic => {
				res.send(subtopic);
			})
			.catch(next);
	},
	getAll(req, res, next){
		MainTopic.find()
			.populate({
				path:"topics", 
				model: Topic,
				populate: {
					path: "subtopics",
					model: SubTopic,
					populate: {
						path: "resources",
						model: Resources
					}
				}
			})
			.then(maintopic => {
				res.send(maintopic);
			})
			.catch(next);
	},
	getAllById(req, res, next){
		const mainTopicId = req.params.id;
		MainTopic.find({_id: mainTopicId})
			.populate({
				path:"topics", 
				model: Topic,
				populate: {
					path: "subtopics",
					model: SubTopic,
					populate: {
						path: "resources",
						model: Resources
					}
				}
			})
			.then(maintopic => {
				res.send(maintopic);
			})
			.catch(next);

	},

	createMainTopic (req, res, next) {
		const matter = req.body;
		MainTopic.create(matter)
			.then(main => {
				res.send(main);
			})
			.catch(next);
	},
	createTopic (req, res, next) {
		const matter = req.body;
		Topic.create(matter)
			.then(main => {
				MainTopic.findOneAndUpdate({ _id: main.maintopic_id}, {$push: {topics: main._id}})
					.then();
				res.send(main);
			})
			.catch(next);
	},
	createSubTopic (req, res, next) {
		const matter = req.body;
		SubTopic.create(matter)
			.then(main => {
				Topic.findOneAndUpdate({_id: main.topic_id}, {$push: {subtopics: main._id}})
					.then();
				res.send(main);
			})
			.catch(next);
	},
	createResource (req, res, next) {
		const matter = req.body;
		Resources.create(matter)
			.then(main => {
				SubTopic.findOneAndUpdate({_id: main.subtopic_id}, {$push: {resources: main._id}})
					.then();
				res.send(main);
			})
			.catch(next);
	},
	updateMainTopic(req, res, next){
		const mainTopicId = req.params.id;
		const updatedProperties = req.body;
		MainTopic.findOneAndUpdate({_id: mainTopicId}, updatedProperties)
			.then(() => MainTopic.findById({_id: mainTopicId}))
			.then(maintopic => res.send(maintopic))
			.catch(next);
	},
	updateTopic(req, res, next){
		const topicId = req.params.id;
		const updatedProperties = req.body;
		Topic.findOneAndUpdate({_id: topicId}, updatedProperties)
			.then(() => Topic.findById({_id: topicId}))
			.then(topic => {
				module.exports.updateMainTopicPercentage(topic.maintopic_id);
				res.send(topic);
			})
			.catch(next);
	},
	updateSubTopic(req, res, next){
		const subTopicId = req.params.id;
		const updatedProperties = req.body;
		SubTopic.findOneAndUpdate({_id: subTopicId}, updatedProperties)
			.then(() => SubTopic.findById({_id: subTopicId}))
			.then(subtopic => {
				module.exports.updateTopicPercentage(subtopic.topic_id);
				res.send(subtopic);
			})
			.catch(next);
	},
	updateResource(req, res, next){
		const resourceId = req.params.id;
		const updatedProperties = req.body;
		Resources.findOneAndUpdate({_id: resourceId}, updatedProperties)
			.then(() => Resources.findById({_id: resourceId}))
			.then(resource => {
				module.exports.updateSubtopicPercentage(resourceId);
				res.send(resource);
			})
			.catch(next);
	},
	deleteMainTopic(req, res, next){
		const mainTopicId = req.params.id;
		MainTopic.findByIdAndRemove({_id: mainTopicId})
			.then(() => res.status(204).json({"maintopic": "deleted with success"}))
			.catch(next);
	},
	deleteTopic(req, res, next){
		const topicId = req.params.id;
		Topic.findByIdAndRemove({_id: topicId})
			.then(() => res.status(204).json({"topic": "deleted with success"}))
			.catch(next);
	},
	deleteSubTopic(req, res, next){
		const subTopicId = req.params.id;
		SubTopic.findByIdAndRemove({_id: subTopicId})
			.then(() => res.status(204).json({"subtopic": "deleted with success"}))
			.catch(next);
	},
	deleteResource(req, res, next){
		const resourceId = req.params.id;
		Resources.findByIdAndRemove({_id: resourceId})
			.then(() => res.status(204).json({"resource": "deleted with success"}))
			.catch(next);
	},
	updateSubtopicPercentage(id){
		let nResources = 0.0;
		let subtopic_conclusion = 0.0;
		let subtopic_id = "";
		Resources.find({ subtopic_id: id })
			.then(resources => {
				resources.map(function (resource) {
					subtopic_id = resource.subtopic_id;
					if (resource.concluded){
						nResources += 1;
					}
				});
				subtopic_conclusion = (nResources / resources.length) * 100;
				SubTopic.findOneAndUpdate({_id: subtopic_id}, {percentage_concluded: subtopic_conclusion})
					.then();
			});
	},
	updateTopicPercentage: function (id) {
		let nSubtopics = 0.0;
		let topic_conclusion = 0.0;
		SubTopic.find({topic_id: id})
			.then(subtopics => {
				subtopics.map(function (subtopic) {
					nSubtopics += subtopic.percentage_concluded;
				});
				topic_conclusion = (nSubtopics / subtopics.length);
				Topic.findOneAndUpdate({_id: id}, {percentage_concluded: topic_conclusion})
					.then();
			});
	},
	updateMainTopicPercentage(id) {
		let nTopics = 0.0;
		let maintopic_conclusion = 0.0;
		Topic.find({maintopic_id: id})
			.then(topics => {
				topics.map(function (topic) {
					nTopics += topic.percentage_concluded;
				});
				maintopic_conclusion = (nTopics / topics.length);
				MainTopic.findOneAndUpdate({_id: id}, {percentage_concluded: maintopic_conclusion})
					.then();
			});
	}
};