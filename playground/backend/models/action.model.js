export default (sequelize, Sequelize) => {
	return sequelize.define("action", {
		description: {
			type: Sequelize.TEXT,
		},
		employee_id: {
			type: Sequelize.UUID,
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
	});
};
