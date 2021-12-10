export default (sequelize, Sequelize) => {
	const Action = sequelize.define("action", {
		description: {
			type: Sequelize.TEXT,
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
	});
};
