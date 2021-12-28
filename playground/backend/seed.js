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

// Seeding DB
await db.device.create({ id: "470AD" });

await db.report.create({
	severity: "Error",
	title: "Something went wrong",
	description: "We are going to fix it... Hopefully",
	resolved: false,
	deviceId: "470AD",
});

await db.action.create({
	description: "Turned it off and on again",
	employee_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
	reportId: 1,
});
