import React from 'react';
import Axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, /*Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,*/ useMediaQuery } from '@material-ui/core';

import apiBaseURL from "../../env";

import { AuthContext } from '../../context/authContext';
import { VerreContext } from '../../context/verreContext';
import './GlassList.css';

const GlassList = () => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeVerres, setListeVerres } = React.useContext(VerreContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [message, setMessage] = React.useState('');
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

  const selectRow = (event) => {
    setSelectedRow(event);
    setMessage('');
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteGlass = () => {
    if (selectedRow.length > 0) handleClickOpen();
    else setMessage('Aucun ingrédient sélectionné')
  }

  const confirmDeletion = () => {
    Axios.delete(`${apiBaseURL}/api/v2/glasses/`,
      {
        headers: {
          authorization: accessToken
        },
        data: { deletedGlasses: selectedRow }
      })
      .then(reponse => {
        setListeVerres(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    handleClose();
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
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirmer la suppression des verres'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Etes vous sûr de vouloir supprimer ces verres définitivement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
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

export default GlassList;