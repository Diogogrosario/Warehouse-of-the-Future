import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextareaAutosize, TextField, Typography } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from "@mui/system";

interface AddActionFormProps {
    open: boolean;
    onCancel: React.MouseEventHandler;
    onSuccess: React.MouseEventHandler;
}

interface SeverityOption {
    label: string;
    value: string;
}

const severityOptions = [
    {
        label: "Warning",
        value: "warning",
    },
    {
        label: "Error",
        value: "error",
    },
] as SeverityOption[];

const AddActionForm: React.FC<AddActionFormProps> = (props : AddActionFormProps) => {
    const { open, onCancel, onSuccess } = props;

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
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            gridTemplateAreas: `
                                "date ."
                                "desc desc"
                            `,
                        }}
                    >
                        <TextField
                            required
                            id="report-action-date-input"
                            label="Date"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            style={{ gridArea: "date", margin: "8px 0" }}
                        />
                        <TextField
                            required
                            id="report-action-desc-input"
                            label="Description"
                            multiline
                            minRows={2}
                            maxRows={4}
                            style={{ gridArea: "desc", margin: "8px 0" }}
                        />
                    </div>
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
}

export default AddActionForm;