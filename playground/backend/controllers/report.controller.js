import db from "../models/index.js";
const Report = db.report;

// Create and Save a new Report
export function create(req, res) {
	// validate request
	if (!req.params.id) {
		res.status(400).send({
			message: "Empty content.",
		});
		return;
	}

	const report = {
		id: req.params.id,
		title: req.body.title,
		severity: req.body.severity,
		description: req.body.description,
		resolved: req.body.resolved,
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
	Report.findAll()
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

	Report.findByPk(id)
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

	Report.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({ message: "Success." });
			} else {
				res.send({ message: "Can't update report ${id}." });
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
				res.send({ message: "Sucess." });
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
