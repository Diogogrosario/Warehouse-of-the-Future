export default (sequelize, Sequelize) => {
	return sequelize.define("device", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
	});
};
