import db from "./models/index.js";

// Deleting previous records and reseting base ID
await db.action.destroy({
	where: {},
	truncate: true,
	cascade: true,
	restartIdentity: true,
});

await db.report.destroy({
	where: {},
	truncate: true,
	cascade: true,
	restartIdentity: true,
});

await db.device.destroy({
	where: {},
	truncate: true,
	cascade: true,
	restartIdentity: true,
});
