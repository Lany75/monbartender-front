import React from 'react';
import Axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery } from '@material-ui/core';

import apiBaseURL from "../../env";

import './GlassList.css';
import { AuthContext } from '../../context/authContext';
import { VerreContext } from '../../context/verreContext';
import DialogDeleteGlass from '../dialogDeleteGlass/DialogDeleteGlass';
import DialogErrorMessage from '../dialogErrorMessage/DialogErrorMessage';

import camelCaseText from '../../utils/cameCaseText';

const GlassList = ({ message, setMessage }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeVerres, setListeVerres } = React.useContext(VerreContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [openDeleteGlassDialog, setOpenDeleteGlassDialog] = React.useState(false);
  const [openModifyGlassDialog, setOpenModifyGlassDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [oldGlassName, setOldGlassName] = React.useState('');
  const [newGlassName, setNewGlassName] = React.useState('');
  const [modifiedGlassId, setModifiedGlassId] = React.useState('');
  const desktop = useMediaQuery('(min-width:769px)');
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

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

  const handleClickOpenModifyGlassDialog = (event) => {
    setMessage('');
    setModifiedGlassId(event.row.id);
    setOldGlassName(event.row.nom);
    setNewGlassName(event.row.nom);
    setOpenModifyGlassDialog(true);
  };
  const handleCloseModifyGlassDialog = () => {
    setOpenModifyGlassDialog(false);
  };
  const confirmModification = () => {
    if (newGlassName !== oldGlassName) {
      const name = newGlassName.replace(/\s+/g, ' ').trim();

      if (
        !(/\S/.test(name) &&
          name.length >= 2 &&
          name.length <= 30)
      ) setMessage('Le nom doit avoir entre 2 et 30 caractères');
      else {
        if (
          listeVerres.findIndex(verre => verre.nom === camelCaseText(name)) !== -1
        ) setMessage('Ce verre existe déja');
        else {
          Axios.put(`${apiBaseURL}/api/v2/glasses/${modifiedGlassId}`,
            { nom: name },
            {
              headers: {
                authorization: accessToken
              }
            })
            .then(reponse => {
              setListeVerres(reponse.data);
            })
            .catch(error => {
              console.log("vous avez une erreur : ", error);
            });
        }
      }
    }

    handleCloseModifyGlassDialog();
  }

  const selectRow = (event) => {
    setSelectedRow(event);
    setMessage('');
  }

  const handleOpenDeleteGlassDialog = () => {
    setOpenDeleteGlassDialog(true);
  };

  const deleteGlass = () => {
    if (selectedRow.length > 0) handleOpenDeleteGlassDialog();
    else setOpenErrorMessageDialog(true);
  }

  return (
    <>
      <h4>LES VERRES</h4>
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
          onCellClick={handleClickOpenModifyGlassDialog}
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
        <div className='message'>{message}</div>
      </div>

      <Dialog
        open={openModifyGlassDialog}
        onClose={handleCloseModifyGlassDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier le verre</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Corrigez le nom du verre
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du verre"
            value={newGlassName}
            onChange={event => setNewGlassName(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModifyGlassDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmModification} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      <DialogDeleteGlass
        openDeleteGlassDialog={openDeleteGlassDialog}
        setOpenDeleteGlassDialog={setOpenDeleteGlassDialog}
        selectedRow={selectedRow}
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