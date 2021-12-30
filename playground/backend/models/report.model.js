export default (sequelize, Sequelize) => {
	return sequelize.define("report", {
		severity: {
			type: Sequelize.ENUM("error", "warning"),
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
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},
	});
};
