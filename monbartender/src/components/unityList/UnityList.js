import React from 'react';
import Axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { IngredientContext } from '../../context/ingredientContext';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery } from '@material-ui/core';

import apiBaseURL from "../../env";

import { AuthContext } from '../../context/authContext';
import './UnityList.css';

const UnityList = ({ message, setMessage }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { unitiesList, setUnitiesList } = React.useContext(IngredientContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [openDeleteUnityDialog, setOpenDeleteUnityDialog] = React.useState(false);
  const [openModifyUnityDialog, setOpenModifyUnityDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [oldUnityName, setOldUnityName] = React.useState('');
  const [newUnityName, setNewUnityName] = React.useState('');
  const [modifiedUnityId, setModifiedUnityId] = React.useState('');
  const desktop = useMediaQuery('(min-width:769px)');

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

  const handleClickOpenModifyUnityDialog = (event) => {
    setMessage('');
    setModifiedUnityId(event.row.id);
    setOldUnityName(event.row.nom);
    setNewUnityName(event.row.nom);
    setOpenModifyUnityDialog(true);
  };
  const handleCloseModifyUnityDialog = () => {
    setOpenModifyUnityDialog(false);
  };
  const confirmModification = () => {
    if (newUnityName !== oldUnityName) {
      const name = newUnityName.replace(/\s+/g, ' ').trim();

      if (
        !(/\S/.test(name) &&
          name.length >= 1 &&
          name.length <= 30)
      ) setMessage('Le nom doit avoir entre 1 et 30 caractères');
      else {
        if (
          unitiesList.findIndex(unite => unite.nom === name) !== -1
        ) setMessage('Cette unité existe déja');
        else {
          Axios.put(`${apiBaseURL}/api/v2/unities/${modifiedUnityId}`,
            { nom: name },
            {
              headers: {
                authorization: accessToken
              }
            })
            .then(reponse => {
              setUnitiesList(reponse.data);
            })
            .catch(error => {
              console.log("vous avez une erreur : ", error);
            });
        }
      }
    }

    handleCloseModifyUnityDialog();
  }

  const selectRow = (event) => {
    setSelectedRow(event);
    setMessage('');
  }
  const handleCloseDeleteUnityDialog = () => {
    setOpenDeleteUnityDialog(false);
  };
  const handleClickOpenDeleteUnityDialog = () => {
    setOpenDeleteUnityDialog(true);
  };
  const deleteUnity = () => {
    if (selectedRow.length > 0) handleClickOpenDeleteUnityDialog();
    else setMessage('Aucune unité sélectionné')
  }
  const confirmDeletion = () => {
    Axios.delete(`${apiBaseURL}/api/v2/unities/`,
      {
        headers: {
          authorization: accessToken
        },
        data: { deletedUnities: selectedRow }
      })
      .then(reponse => {
        setUnitiesList(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
    handleCloseDeleteUnityDialog();

  }

  return (
    <>
      <div className='unities-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={unitiesList}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectRow}
          onCellClick={handleClickOpenModifyUnityDialog}
        />
      </div>

      <Dialog
        open={openModifyUnityDialog}
        onClose={handleCloseModifyUnityDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier l'unité</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Corrigez le nom de l'unité
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de l'unité"
            value={newUnityName}
            onChange={event => setNewUnityName(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModifyUnityDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmModification} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      <div className='delete-unity'>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteUnity}
        >
          Supprimer les unités
        </Button>
        <div className='message'>{message}</div>
      </div>

      <Dialog
        open={openDeleteUnityDialog}
        onClose={handleCloseDeleteUnityDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirmer la suppression des unités</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sûr de vouloir supprimer ces unités définitivement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteUnityDialog} color='primary'>
            Annuler
          </Button>
          <Button onClick={confirmDeletion} color='primary' autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UnityList;