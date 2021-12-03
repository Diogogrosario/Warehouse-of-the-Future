export default (sequelize, Sequelize) => {
	const Action = sequelize.define("action", {
		severity: {
			type: Sequelize.ENUM("Error", "Warning"),
		},
		description: {
			type: Sequelize.TEXT,
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
	});
};
