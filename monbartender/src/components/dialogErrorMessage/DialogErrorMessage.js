import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const DialogErrorMessage = ({ openErrorMessageDialog, setOpenErrorMessageDialog, errorMessage }) => {
  const closeErrorMessageDialog = () => {
    setOpenErrorMessageDialog(false);
  }
  return (
    <Dialog
      open={openErrorMessageDialog}
      onClose={closeErrorMessageDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Erreur ...</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeErrorMessageDialog} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default DialogErrorMessage;