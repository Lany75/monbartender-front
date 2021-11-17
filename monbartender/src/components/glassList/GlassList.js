import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, useMediaQuery } from '@material-ui/core';

import './GlassList.css';
import { VerreContext } from '../../context/verreContext';
import DialogDeleteGlass from '../dialogDeleteGlass/DialogDeleteGlass';
import DialogModifyGlass from '../dialogModifyGlass/DialogModifyGlass';
import DialogAddNewGlass from '../dialogAddNewGlass/DialogAddNewGlass';
import DialogErrorMessage from '../dialogErrorMessage/DialogErrorMessage';

const GlassList = () => {
  const { listeVerres } = React.useContext(VerreContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [openDeleteGlassDialog, setOpenDeleteGlassDialog] = React.useState(false);
  const [openModifyGlassDialog, setOpenModifyGlassDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const desktop = useMediaQuery('(min-width:769px)');
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);
  const [clickedGlass, setClickedGlass] = React.useState({});
  const [openAddNewGlassDialog, setOpenAddewGlassDialog] = React.useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: desktop ? 300 : 150,
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: desktop ? 300 : 150,
    }
  ];

  const handleOpenModifyGlassDialog = (event) => {
    setClickedGlass(event.row);
    setOpenModifyGlassDialog(true);
  };

  const selectRow = (event) => {
    setSelectedRow(event);
  }

  const handleOpenDeleteGlassDialog = () => {
    setOpenDeleteGlassDialog(true);
  };

  const deleteGlass = () => {
    if (selectedRow.length > 0) handleOpenDeleteGlassDialog();
    else setOpenErrorMessageDialog(true);
  }

  const addGlass = () => {
    setOpenAddewGlassDialog(true);
  }

  return (
    <>
      <div className='glasses-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={listeVerres}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectRow}
          onCellClick={handleOpenModifyGlassDialog}
        />
      </div>

      <div className='delete-glass'>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteGlass}
        >
          Supprimer les verres
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={addGlass}
        >
          Ajouter un verre
        </Button>
      </div>

      <DialogModifyGlass
        openModifyGlassDialog={openModifyGlassDialog}
        setOpenModifyGlassDialog={setOpenModifyGlassDialog}
        modifiedGlass={clickedGlass}
      />

      <DialogDeleteGlass
        openDeleteGlassDialog={openDeleteGlassDialog}
        setOpenDeleteGlassDialog={setOpenDeleteGlassDialog}
        selectedRow={selectedRow}
      />

      <DialogAddNewGlass
        openAddNewGlassDialog={openAddNewGlassDialog}
        setOpenAddewGlassDialog={setOpenAddewGlassDialog}
      />

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={'Aucun verre sélectionné'}
      />
    </>
  )
}

export default GlassList;