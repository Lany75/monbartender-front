import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery } from '@material-ui/core';

const DialogAddNewStep = ({ openAddNewStepDialog, setOpenAddNewStepDialog, numEtape, steps, setSteps }) => {
  const desktop = useMediaQuery('(min-width:769px)');
  const [stepText, setStepText] = React.useState('');

  const handleCloseAddNewStepDialog = () => {
    setOpenAddNewStepDialog(false);
  };

  const cancelAdding = () => {
    closeDialog();
  }

  const closeDialog = () => {
    setStepText('');
    handleCloseAddNewStepDialog();
  }

  const addStep = () => {
    if (stepText !== '') {
      const tabSteps = [...steps];
      tabSteps.push({ id: uuidv4(), etape: steps.length + 1, libelle: stepText })
      setSteps(tabSteps);
    }
    closeDialog();
  }

  return (
    <Dialog
      open={openAddNewStepDialog}
      onClose={handleCloseAddNewStepDialog}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Ajout de l'étape {numEtape}</DialogTitle>
      <DialogContent>
        <TextField
          label='libellé'
          variant='outlined'
          margin='normal'
          name='cocktailStep'
          value={stepText}
          onChange={event => setStepText(event.target.value)}
          style={{ width: desktop ? 500 : 100 }}
          multiline
          rows={3}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelAdding} color="primary">
          Annuler
        </Button>
        <Button onClick={addStep} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAddNewStep