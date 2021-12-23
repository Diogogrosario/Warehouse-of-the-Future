import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {
	return sequelize.define("action", {
		description: {
			type: Sequelize.TEXT,
		},
		employee_id: {
			type: Sequelize.UUID,
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: DataTypes.NOW,
		},
	});
};
