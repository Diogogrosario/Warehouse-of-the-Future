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

interface AddActionFormProps {
	open: boolean;
	onCancel: React.MouseEventHandler;
	onSuccess: React.MouseEventHandler;
}

const AddActionForm: React.FC<AddActionFormProps> = (props: AddActionFormProps) => {
	const { open, onCancel, onSuccess } = props;

	const [closingAction, setClosingAction] = React.useState(false);

	return (
		<Dialog open={open}>
			<DialogTitle>
				<Typography variant="h5" component="h1">
					Add Action
				</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<Typography variant="body1" component="span">
						Description for adding an action (placeholder if needed)
					</Typography>
				</DialogContentText>
				<Box component="form">
					<Grid container spacing={2} alignItems="center" pt={2}>
						<Grid item xs={6}>
							<TextField
								required
								id="report-action-empId-input"
								label="Employee ID"
								sx={{ width: 1 }}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControlLabel
								control={
									<Checkbox
										checked={closingAction}
										onChange={() => setClosingAction((prevState) => !prevState)}
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
								multiline
								minRows={2}
								maxRows={4}
								sx={{ width: 1 }}
							/>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} endIcon={<CloseIcon />}>
					Cancel
				</Button>
				<Button onClick={onSuccess} endIcon={<CheckIcon />}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddActionForm;
