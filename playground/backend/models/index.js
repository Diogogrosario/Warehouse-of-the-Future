import Sequelize from "sequelize";
import device from "./device.model.js";
import report from "./report.model.js";
import action from "./action.model.js";

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASSWORD,
	{
		host: process.env.POSTGRES_HOST || "db",
		dialect: "postgres",
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.device = device(sequelize, Sequelize);
db.report = report(sequelize, Sequelize);
db.action = action(sequelize, Sequelize);

db.device.hasMany(db.report);
db.report.belongsTo(db.device);

db.report.hasMany(db.action);
db.action.belongsTo(db.report);

export default db;
