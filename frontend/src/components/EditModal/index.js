import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, Box, } from "@mui/material";
import styled from "@emotion/styled";

const EditModal = ({ _onConfirm, _handledelete, eidtform }) => {
    const [open, setOpen] = React.useState(false);
    const _handleClickOpen = () => {
        setOpen(true);
    };

    const _handleClose = () => {
        setOpen(false);
    };
    const StyledChip = styled(Chip)(({ theme }) => ({
        borderRadius: 4,
        margin: "0 0.2em 0 0",
        color: theme.palette.common.lighter,
    }));
    return (
        <div>
            <StyledChip
                variant="filled"
                onClick={() => {
                    _handleClickOpen()
                }}
                label={<b>Edit</b>}
                size="small"
                color="warning"
            />
            <Dialog
                open={open}
                onClose={_handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit
                </DialogTitle>
                <DialogContent>
                    <Box>{eidtform}</Box>
                </DialogContent>
                <DialogActions>
                    <StyledChip
                        color="warning"
                        label={<b>Cancel</b>}
                        onClick={_handleClose}

                    />
                    <StyledChip
                        color="warning"
                        onClick={() => {
                            _onConfirm()
                            _handleClose()
                        }}
                        label={<b>Save</b>} />
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default EditModal;
