export default (sequelize, Sequelize) => {
	const Device = sequelize.define("device", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
	});
};
