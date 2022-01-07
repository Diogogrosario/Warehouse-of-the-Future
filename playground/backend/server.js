import express, { json, urlencoded } from "express";
import cors from "cors";
import db from "./models/index.js";
import router from "./routes/playground.routes.js";

const app = express();

// parse requests of content-type - application/json
app.use(json());
app.use(cors());

db.sequelize.sync(); // may want to use force=true

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the playgroud backend API" });
});

// use routes defined in ./routes/playground.routes.js
app.use("/", router);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
