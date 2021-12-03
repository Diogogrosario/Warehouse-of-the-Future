import express, { json, urlencoded } from "express";

const db = require("models");

const app = express();

// parse requests of content-type - application/json
app.use(json());
db.sequelize.sync(); // may want to use force=true

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
