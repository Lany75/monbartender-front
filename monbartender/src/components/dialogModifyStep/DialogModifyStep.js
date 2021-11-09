import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery } from '@material-ui/core';

const DialogModifyStep = ({ openModifyStepDialog, setOpenModifyStepDialog, steps, setSteps, stepText, setStepText, stepId, setStepId, numEtape, setNumEtape }) => {
  const desktop = useMediaQuery('(min-width:769px)');

  const closeModifyStepDialog = () => {
    setStepText('');
    setStepId('');
    setNumEtape('');
    setOpenModifyStepDialog(false);
  };

  const cancelModifying = () => {
    closeModifyStepDialog();
  }

  const confirmModification = () => {
    const tabSteps = [...steps];
    const index = tabSteps.findIndex(step => step.id === (stepId));

    if (stepText !== '') {
      tabSteps.splice(index, 1, { id: stepId, etape: numEtape, libelle: stepText })
    }
    setSteps(tabSteps);
    closeModifyStepDialog();
  }

  return (
    <Dialog
      open={openModifyStepDialog}
      onClose={closeModifyStepDialog}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Modification de l'étape {numEtape}</DialogTitle>
      <DialogContent>
        <TextField
          label='nouveau libellé'
          variant='outlined'
          margin='normal'
          name='cocktailStep'
          value={stepText}
          onChange={event => setStepText(event.target.value)}
          style={{ width: desktop ? 500 : 240 }}
          multiline
          rows={3}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelModifying} color="primary">
          Annuler
        </Button>
        <Button onClick={confirmModification} color="primary">
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogModifyStep;