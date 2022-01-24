export default (sequelize, Sequelize) => {
	return sequelize.define("action", {
		description: {
			type: Sequelize.TEXT,
		},
		employeeId: {
			type: Sequelize.TEXT,
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
