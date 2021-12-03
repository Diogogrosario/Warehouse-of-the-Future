import Sequelize from "sequelize";

const sequelize = new Sequelize(
	"playground_db",
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASSWORD,
	{
		host: "localhost",
		dialect: "postgres",
	}
);

const db = {};

db.Sequelize = Sequelize;

db.device = require("./device.model.js")(sequelize, Sequelize);
db.report = require("./report.model.js")(sequelize, Sequelize);
db.action = require("./action.model.js")(sequelize, Sequelize);

export default db;
