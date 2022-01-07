import db from "../models/index.js";
const Action = db.action;

// Create and Save a new Action
export function create(req, res) {
	const action = {
		description: req.body.description,
		employeeId: req.body.employeeId,
		reportId: req.body.reportId,
	};

	// save to database
	Action.create(action)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error at create action." });
		});
}

// Retrieve all Action from the database.
export function findAll(req, res) {
	Action.findAll({ order: [["createdAt", "DESC"]] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on actions retrieval" });
		});
}

// Find a single Action with an id
export function findOne(req, res) {
	const id = req.params.id;

	Action.findByPk(id)
		.then((data) => {
			if (data) res.send(data);
			else res.status(404).send({ message: `Didn't find action ${id}.` });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || `Error on action ${id} retrieval.` });
		});
}

// Update a Action by the id in the request
export function update(req, res) {
	const id = req.params.id;

	Action.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({ message: "Success." });
			} else {
				res.send({ message: `Can't update report ${id}.` });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on update report." });
		});
}

// Delete a Action with the specified id in the request
const _delete = (req, res) => {
	const id = req.params.id;

	Action.destroy({ where: { id: id } })
		.then((num) => {
			if (num == 1) {
				res.send({ message: "Success." });
			} else {
				res.status(404).send({ message: "Action not found." });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on delete action. " });
		});
};
export { _delete as delete };

// Delete all Actions from the database.
export function deleteAll(req, res) {
	Action.destroy({
		where: {},
	})
		.then(() => {
			res.send({ message: "Success." });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error at action deleteAll." });
		});
}
