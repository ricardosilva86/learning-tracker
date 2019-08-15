const LearnController = require("../controllers/learn_controller");

module.exports = (app) => {
	//All get routes to API
	app.get("/api", LearnController.index);
	app.get("/api/all", LearnController.getAll);
	app.get("/api/get/:id", LearnController.getAllById);
	app.get("/api/get/maintopic/:id", LearnController.getMainTopic);
	app.get("/api/all/maintopics", LearnController.getMainTopicsOnly);
	app.get("/api/all/topics", LearnController.getTopicsOnly);
	app.get("/api/all/topics/:id", LearnController.getTopicsByMainTopicId);
	app.get("/api/get/topic/:id", LearnController.getTopic);
	app.get("/api/get/subtopic/:id", LearnController.getSubTopic);
	app.get("/api/all/subtopics", LearnController.getSubTopicsOnly);
	app.get("/api/all/subtopics/:id", LearnController.getSubTopicsByTopicId);
	app.get("/api/get/resource/:id", LearnController.getResource);

	//All post routes to API
	app.post("/api/maintopic", LearnController.createMainTopic);
	app.post("/api/topic", LearnController.createTopic);
	app.post("/api/subtopic", LearnController.createSubTopic);
	app.post("/api/resource", LearnController.createResource);

	//All put routes to API
	app.put("/api/maintopic/:id", LearnController.updateMainTopic);
	app.put("/api/topic/:id", LearnController.updateTopic);
	app.put("/api/subtopic/:id", LearnController.updateSubTopic);
	app.put("/api/resource/:id", LearnController.updateResource);

	//All delete routes to API
	app.delete("/api/maintopic/:id", LearnController.deleteMainTopic);
	app.delete("/api/topic/:id", LearnController.deleteTopic);
	app.delete("/api/subtopic/:id", LearnController.deleteSubTopic);
	app.delete("/api/resource/:id", LearnController.deleteResource);

	//All function routes
};