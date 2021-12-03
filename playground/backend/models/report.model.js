export default (sequelize, Sequelize) => {
	const Report = sequelize.define("report", {
		severity: {
			type: Sequelize.ENUM("Error", "Warning"),
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
