const request = require("request");
const express = require("express");
const expressHttp = require(__dirname + "/../src/expressHttp.js");
const { expect } = require("chai");
const PORT = 22312;

describe("Express HTTP", function() {
	
	let server;

	before(function(done) {
		expressHttp(express, { 901: "Custom error" }, "sendSuccess", undefined);
		let app = express();
		app.get("/success", (request, response) => {
			return response.sendSuccess({ message: "This is a success" }, 200);
		});
		app.get("/error/404", (request, response) => {
			return response.httpError({ message: "This is an error" }, 404);
		});
		app.get("/error/custom", (request, response) => {
			return response.httpError({ message: "This is an error" }, 901);
		});
		server = app.listen(PORT, () => done());
	});

	after(function() {
		server.close();
	});

	it("works for success (with custom method name)", function(done) {
		request(
			{
				url: `http://127.0.0.1:${PORT}/success`,
				method: "GET",
				json: true
			},
			(error, response, body) => {
				if (error) {
					console.log(error);
					throw error;
				}
				expect(body).to.deep.equal({ success: true, code: 200, status: "OK", message: "This is a success" });
				return done();
			}
		);
	});

	it("works for error", function(done) {
		request(
			{
				url: `http://127.0.0.1:${PORT}/error/404`,
				method: "GET",
				json: true
			},
			(error, response, body) => {
				if (error) {
					console.log(error);
					throw error;
				}
				expect(body).to.deep.equal({ error: true, code: 404, status: "Not found", message: "This is an error" });
				return done();
			}
		);
	});

	it("works for custom", function(done) {
		request(
			{
				url: `http://127.0.0.1:${PORT}/error/custom`,
				method: "GET",
				json: true
			},
			(error, response, body) => {
				if (error) {
					console.log(error);
					throw error;
				}
				expect(body).to.deep.equal({ error: true, code: 901, status: "Custom error", message: "This is an error" });
				return done();
			}
		);
	});
});
