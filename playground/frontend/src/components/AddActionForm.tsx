import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useController } from "rest-hooks";

import { ActionResource } from "../resources/ActionResource";
import { ReportResource } from "../resources/ReportResource";

interface AddActionFormProps {
	open: boolean;
	onCancel: React.MouseEventHandler;
	reportId: number;
	closed: boolean;
}

const AddActionForm: React.FC<AddActionFormProps> = (props: AddActionFormProps) => {
	const { open, onCancel, reportId, closed } = props;

	const formId = open ? `playground-report-${reportId}-action-form` : undefined;

	const [closingAction, setClosingAction] = React.useState(false);

	const [employeeId, setEmployeeId] = React.useState("");
	const [description, setDescription] = React.useState("");

	const { fetch } = useController();

	return (
		<Dialog open={open}>
			<DialogTitle>Add Action</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<Typography variant="body1" component="span">
						Description for adding an action (placeholder if needed)
					</Typography>
				</DialogContentText>
				<Box id={formId} component="form">
					<Grid container spacing={2} alignItems="center" pt={2}>
						<Grid item xs={6}>
							<TextField
								required
								id="report-action-empId-input"
								label="Employee ID"
								inputProps={{ name: "employeeId" }}
								sx={{ width: 1 }}
								value={employeeId}
								onChange={(
									e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
								) => setEmployeeId(e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControlLabel
								control={
									<Checkbox
										checked={closingAction}
										onChange={() => setClosingAction((prevState) => !prevState)}
										inputProps={{ name: "resolved" }}
									/>
								}
								label="Mark report as resolved"
								sx={{ width: 1 }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="report-action-desc-input"
								label="Description"
								inputProps={{ name: "description" }}
								multiline
								minRows={2}
								maxRows={4}
								sx={{ width: 1 }}
								value={description}
								onChange={(
									e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
								) => setDescription(e.target.value)}
							/>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} endIcon={<CloseIcon />}>
					Cancel
				</Button>
				<Button
					onClick={(e) => {
						fetch(
							ReportResource.update(),
							{ id: reportId },
							{ resolved: closed !== closingAction }
						);
						fetch(
							ActionResource.create(),
							{},
							{ employeeId: employeeId, description: description, reportId: reportId }
						);
						onCancel(e);
					}}
					endIcon={<CheckIcon />}
				>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddActionForm;
