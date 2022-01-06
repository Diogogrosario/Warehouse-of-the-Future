import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Box } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

interface AddActionFormProps {
    open: boolean;
    onCancel: React.MouseEventHandler;
    onSuccess: React.MouseEventHandler;
}

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
                    <TextField
                        required
                        id="report-action-desc-input"
                        label="Description"
                        multiline
                        minRows={2}
                        maxRows={4}
                        style={{ gridArea: "desc", margin: "8px 0", width: "100%" }}
                    />
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