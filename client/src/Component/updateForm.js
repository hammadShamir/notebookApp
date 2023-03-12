import React from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const UpdateForm = ({ open, handleClose, handleSave, onChange, title, description }) => {

    return (
        <Dialog open={open} onClose={handleClose}
        >
            <DialogTitle>Update Note</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    value={title}
                    name='title'
                    onChange={onChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Note"
                    type="text"
                    value={description}
                    name='description'
                    onChange={onChange}
                    fullWidth
                    multiline
                    minRows={6}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default UpdateForm
