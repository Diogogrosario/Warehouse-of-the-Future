import Sequelize from "sequelize";
import device from "./device.model.js";
import report from "./report.model.js";
import action from "./action.model.js";

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASSWORD,
	{
		host: "db",
		dialect: "postgres",
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.device = device(sequelize, Sequelize);
db.report = report(sequelize, Sequelize);
db.action = action(sequelize, Sequelize);

// module.exports = db;
export default db;
