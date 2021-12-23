export default (sequelize, Sequelize) => {
	const Action = sequelize.define("action", {
		description: {
			type: Sequelize.TEXT,
		},
		employee_id: {
			type: Sequelize.UUID,
		},
	});

	return Action;
};
