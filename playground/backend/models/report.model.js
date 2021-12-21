export default (sequelize, Sequelize) => {
	const Report = sequelize.define("report", {
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

	return Report;
};
