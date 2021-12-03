import { device, Sequelize } from "../models";
const Device = device;

// Create and Save a new Device
export function create(req, res) {
	// validate request
	if (!req.params.id) {
		res.status(400).send({
			message: "Empty content.",
		});
		return;
	}

	const device = {
		id: req.params.id,
	};

	// save to database
	Device.create(device)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error at create device." });
		});
}

// Retrieve all Devices from the database.
export function findAll(req, res) {
	Device.findAll()
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

	Device.findByPk(id)
		.then((data) => {
			if (data) res.send(data);
			else res.status(404).send({ message: "Didn't find device ${id}." });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on device ${id} retrieval." });
		});
}

// Update a Device by the id in the request
export function update(req, res) {
	res.send({ message: "Not implemented for device." });
}

// Delete a Device with the specified id in the request
const _delete = (req, res) => {
	Device.destroy({ where: { id: id } })
		.then((num) => {
			if (num == 1) {
				res.send({ message: "Sucess." });
			} else {
				res.status(404).send({ message: err.message || "Device not found." });
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
