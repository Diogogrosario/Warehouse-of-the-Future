import db from "./models/index.js";

// Seeding DB
await db.device.create({ id: "470AD" });

await db.report.create({
	severity: "error",
	title: "Something went wrong",
	description: "We are going to fix it... Hopefully",
	resolved: false,
	deviceId: "470AD",
});

await db.report.create({
	severity: "error",
	title: "HAHAHAHAHA",
	description: "Very funny",
	resolved: false,
	deviceId: "470AD",
});

await db.report.create({
	severity: "warning",
	title: "HIHIHIHIHII",
	description: "Very funny",
	resolved: false,
	deviceId: "470AD",
});

await db.action.create({
	description: "Turned it off and on again",
	employeeId: "Ricardo Fontão",
	reportId: 1,
});

await db.action.create({
	description: "Replaced part",
	employeeId: "Ivo Saavedra",
	reportId: 1,
});
