import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, useMediaQuery } from '@material-ui/core';
import './CocktailSteps.css';
import DialogAddNewStep from '../dialogAddNewStep/DialogAddNewStep';
import DialogModifyStep from '../dialogModifyStep/DialogModifyStep';
import DialogErrorMessage from '../dialogErrorMessage/DialogErrorMessage';

const CocktailSteps = ({ steps, setSteps }) => {
  const desktop = useMediaQuery('(min-width:769px)');
  const [pageSize, setPageSize] = React.useState(5);
  const [stepText, setStepText] = React.useState('');
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [stepId, setStepId] = React.useState('');
  const [numEtape, setNumEtape] = React.useState('');
  const [openAddNewStepDialog, setOpenAddNewStepDialog] = React.useState(false);
  const [openModifyStepDialog, setOpenModifyStepDialog] = React.useState(false);
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true
    },
    {
      field: 'etape',
      headerName: 'Etape',
      width: desktop ? 115 : 95,
    },
    {
      field: 'libelle',
      headerName: 'Libellé',
      width: desktop ? 315 : 100,
    }
  ];

  const handleClickOpenAddNewStepDialog = () => {
    setNumEtape(steps.length + 1);
    setOpenAddNewStepDialog(true);
  }

  const selectRow = (event) => {
    setSelectedRow(event);
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

    } else setOpenErrorMessageDialog(true);
  }

  const openModifyStepTextDialog = (event) => {
    setStepText(event.row.libelle);
    setStepId(event.row.id);
    setNumEtape(event.row.etape);
    setOpenModifyStepDialog(true);
  }

  return (
    <div className='cocktail-add-steps'>
      <div className='cocktail-steps-list' style={{ height: 110 + pageSize * 52, width: '100%', alignSelf: 'center' }}>
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
          id='add-button'
        >
          Ajouter une étape
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteSteps}
          id='add-button'
        >
          Supprimer les étapes
        </Button>
      </div>

      <DialogAddNewStep
        openAddNewStepDialog={openAddNewStepDialog}
        setOpenAddNewStepDialog={setOpenAddNewStepDialog}
        numEtape={numEtape}
        steps={steps}
        setSteps={setSteps}
      />

      <DialogModifyStep
        openModifyStepDialog={openModifyStepDialog}
        setOpenModifyStepDialog={setOpenModifyStepDialog}
        steps={steps}
        setSteps={setSteps}
        stepText={stepText}
        setStepText={setStepText}
        stepId={stepId}
        setStepId={setStepId}
        numEtape={numEtape}
        setNumEtape={setNumEtape}
      />

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={'Aucune étape sélectionnée'}
      />
    </div>
  )
}

export default CocktailSteps;