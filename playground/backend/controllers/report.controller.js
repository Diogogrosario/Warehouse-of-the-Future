import db from "../models/index.js";
const Report = db.report;

// Create and Save a new Report
export function create(req, res) {
	const report = {
		title: req.body.title,
		severity: req.body.severity,
		description: req.body.description,
		resolved: false,
	};

	// save to database
	Report.create(report)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error at create report." });
		});
}

// Retrieve all Reports from the database.
export function findAll(req, res) {
	const Action = db.action;
	Report.findAll({
		include: {
			model: Action,
			separate: true,
			order: [["createdAt", "DESC"]],
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on reports retrieval" });
		});
}

// Find a single Report with an id
export function findOne(req, res) {
	const id = req.params.id;
	const Action = db.action;

	Report.findByPk(id, {
		include: Action,
	})
		.then((data) => {
			if (data) res.send(data);
			else res.status(404).send({ message: `Didn't find report ${id}.` });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || `Error on report ${id} retrieval.` });
		});
}

// Update a Report by the id in the request
export function update(req, res) {
	const id = req.params.id;

	// other updates
	Report.update(req.body, {
		where: { id: id },
		returning: true,
	})
		.then((result) => {
			let num = result[0];
			let obj = result[1][0].dataValues;
			if (num > 0) {
				res.send(obj);
			} else {
				res.status(400).send({ message: "Can't update report ${id}." });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on update report." });
		});
}

// Delete a Report with the specified id in the request
const _delete = (req, res) => {
	const id = req.params.id;

	Report.destroy({ where: { id: id } })
		.then((num) => {
			if (num == 1) {
				res.send({ message: "Success." });
			} else {
				res.status(404).send({ message: "Report not found." });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error on delete report. " });
		});
};
export { _delete as delete };

// Delete all Reports from the database.
export function deleteAll(req, res) {
	Report.destroy({
		where: {},
	})
		.then(() => {
			res.send({ message: "Success." });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message || "Error at report deleteAll." });
		});
}
