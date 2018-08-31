//import express from 'express'
const express = require("express");

const db = require("./data/db");

const server = express();

const cors = require("cors");

//configure middleware
server.use(express.json());
server.use(cors());

//configure routing (also middleware)
server.get("/", (_, res) => {
	res.send("Hello Cs12");
});

server.get("/users", async (req, res) => {
	try {
		let data = await db.find();
		if (data.length > 0) {
			return res.status(200).json(data);
		}
		return res
			.status(404)
			.json({ message: "No Server Data Friieennddd" });
	} catch (err) {
		res.status(500).json(err);
	}
});

server.post("/users", async (req, res) => {
	if (!req.body.name || !req.body.bio) {
		return res
			.status(400)
			.json({ message: "Please provide name and bio for the user" });
	}

	try {
		let data = await db.insert(req.body);
		return res.status(201).json({
			id: data.id,
			name: req.body.name,
			bio: req.body.bio,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

server.get("/users/:id", async (req, res) => {
	try {
		let data = await db.findById(req.params.id);
		if (data.length > 0) {
			return res.status(200).json(data);
		}

		return res.status(404).json({
			message: "The user with the blablbhalbhalbhabhl doesn't exist",
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

server.delete("/users/:id", async (req, res) => {
	try {
		let data = await db.remove(req.params.id);
		if (data > 0) {
			return res.json({ id: req.params.id });
		}

		return res.status(404).json({ message: "don't exist bro" });
	} catch (err) {
		res.status(500).json(err);
	}
});

server.put("/users/:id", async (req, res) => {
	if (!(req.body.name && req.body.bio)) {
		res.status(400).json({
			mesage: "You didn't fill stuff ya ding-dong",
		});
	}
	try {
		let data = await db.update(req.params.id, req.body);
		if (data > 0) {
			return res.json({
				id: req.params.id,
				name: req.body.name,
				bio: req.body.bio,
			});
		} else {
			return res.status(404).json({ message: "Couldn't find ID" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//Start server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
