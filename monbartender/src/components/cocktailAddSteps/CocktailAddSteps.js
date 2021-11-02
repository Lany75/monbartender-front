import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery } from '@material-ui/core';
import './CocktailAddSteps.css';

const CocktailAddSteps = () => {
  const [steps, setSteps] = React.useState([])
  const desktop = useMediaQuery('(min-width:769px)');
  const [pageSize, setPageSize] = React.useState(5);
  const [openAddNewStepDialog, setOpenAddNewStepDialog] = React.useState(false);
  const [openModifyStepDialog, setOpenModifyStepDialog] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [stepText, setStepText] = React.useState('');
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [stepId, setStepId] = React.useState('');
  const [numEtape, setNumEtape] = React.useState('');

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true
    },
    {
      field: 'etape',
      headerName: 'Etape',
      width: 115,
    },
    {
      field: 'libelle',
      headerName: 'Libellé',
      width: desktop ? 425 : 100,
    }
  ];

  const handleCloseAddNewStepDialog = () => {
    setOpenAddNewStepDialog(false);
  };

  const handleClickOpenAddNewStepDialog = (event) => {
    setMessage('');
    setOpenAddNewStepDialog(true);
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

  const cancelAdding = () => {
    setMessage('');
    closeDialog();
  }

  const selectRow = (event) => {
    setSelectedRow(event);
    setMessage('');
  }

  const deleteSteps = () => {
    if (selectedRow.length > 0) {
      const tabSteps = [...steps];
      selectedRow.forEach(id => {
        tabSteps.splice(tabSteps.findIndex(step => step.id === id), 1)
      })

      tabSteps.forEach((step, index) => {
        step.etape = index + 1;
      })
      setSteps(tabSteps);

    } else setMessage('Aucune étape sélectionnée')
  }

  const openModifyStepTextDialog = (event) => {
    setMessage('');
    setStepText(event.row.libelle);
    setStepId(event.row.id);
    setNumEtape(event.row.etape);
    setOpenModifyStepDialog(true);
  }

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

    if (stepText === '') setMessage('Modification impossible');
    else {
      tabSteps.splice(index, 1, { id: stepId, etape: numEtape, libelle: stepText })
    }
    setSteps(tabSteps);
    closeModifyStepDialog();
  }

  return (
    <div className='cocktail-add-steps'>
      <div className='cocktail-add-steps-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={steps}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectRow}
          onCellClick={openModifyStepTextDialog}
        />
      </div>
      <div className='add-delete-steps'>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpenAddNewStepDialog}
        >
          Ajouter une étape
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteSteps}
        >
          Supprimer les étapes
        </Button>
        <div className='message'>{message}</div>
      </div>

      <Dialog
        open={openAddNewStepDialog}
        onClose={handleCloseAddNewStepDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajout d'étape</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Indiquez le libellé à suivre pour l'étape {steps.length + 1}
          </DialogContentText>
          <div className='data-new-step'>
            <TextField
              variant='outlined'
              margin='normal'
              name='cocktailStep'
              value={stepText}
              onChange={event => setStepText(event.target.value)}
              style={{ width: desktop ? 500 : 100 }}
              multiline
              rows={3}
            />
          </div>
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

      <Dialog
        open={openModifyStepDialog}
        onClose={closeModifyStepDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modification d'étape</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Corriger le libellé de l'étape
          </DialogContentText>
          <div className='data-new-step'>
            <TextField
              variant='outlined'
              margin='normal'
              name='cocktailStep'
              value={stepText}
              onChange={event => setStepText(event.target.value)}
              style={{ width: desktop ? 500 : 100 }}
              multiline
              rows={3}
            />
          </div>
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

    </div>
  )
}

export default CocktailAddSteps;