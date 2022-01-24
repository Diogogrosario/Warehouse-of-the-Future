export default (sequelize, Sequelize) => {
	return sequelize.define("device", {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
	});
};
