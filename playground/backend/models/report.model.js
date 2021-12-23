export default (sequelize, Sequelize) => {
	return sequelize.define("report", {
		severity: {
			type: Sequelize.ENUM("Error", "Warning"),
		},
		title: {
			type: Sequelize.TEXT,
		},
		description: {
			type: Sequelize.TEXT,
		},
		resolved: {
			type: Sequelize.BOOLEAN,
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
	});
};
