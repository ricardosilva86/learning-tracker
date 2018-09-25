process.env.NODE_ENV = "test";
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
const app = require("../app");

chai.use(chaiHttp);

describe("First Test", () => {
	it("Application test", (done) => {
		chai.request(app)
			.get("/api")
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});