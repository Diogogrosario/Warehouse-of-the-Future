import db from "./models/index.js";

await db.action.create({
	description: "Turned it off and on again",
	employee_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
});

await db.report.create({
	severity: "Error",
	title: "Something went wrong",
	description: "We are going to fix it... Hopefully",
	resolved: false,
});

await db.device.create({ id: "470AD"});