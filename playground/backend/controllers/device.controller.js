import db from "../models/index.js";
const Device = db.device;

// Create and Save a new Device
export function create(req, res) {
	// save to database
	Device.create({ id: req.body.id })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error at create device." });
		});
}

// Retrieve all Devices from the database.
export function findAll(req, res) {
	const Report = db.report;
	const Action = db.action;
	Device.findAll({
		include: {
			model: Report,
			include: Action,
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on devices retrieval" });
		});
}

// Find a single Device with an id
export function findOne(req, res) {
	const id = req.params.id;
	const Report = db.report;

	Device.findByPk(id, { include: Report })
		.then((data) => {
			if (data) res.send(data);
			else res.status(404).send({ message: `Didn't find device ${id}.` });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || `Error on device ${id} retrieval.` });
		});
}

// Update a Device by the id in the request
export function update(req, res) {
	res.status(405).send({ message: "Not implemented." });
}

// Delete a Device with the specified id in the request
const _delete = (req, res) => {
	const id = req.params.id;

	Device.destroy({ where: { id: id } })
		.then((num) => {
			if (num == 1) {
				res.send({ message: "Success." });
			} else {
				res.status(404).send({ message: "Device not found." });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on delete device. " });
		});
};
export { _delete as delete };

// Delete all Devices from the database.
export function deleteAll(req, res) {
	Device.destroy({
		where: {},
	})
		.then(() => {
			res.send({ message: "Success." });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on device deleteAll." });
		});
}
