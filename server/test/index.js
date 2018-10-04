process.env.NODE_ENV = "test";
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
const app = require("../app");

chai.use(chaiHttp);

describe("All Tests", () => {
	it("Application test", () => {
		chai.request(app)
			.get("/api")
			.end((err, res) => {
				res.should.have.status(200);
			});
	});
	it("Try to GET all", () => {
		chai.request(app)
			.get("/api/all")
			.end((err, res) => {
				res.should.have.status(200);
			});
	});
});