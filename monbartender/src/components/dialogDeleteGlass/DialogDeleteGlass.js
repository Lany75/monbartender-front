import React from 'react';
import Axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import apiBaseURL from "../../env";

import { AuthContext } from '../../context/authContext';
import { VerreContext } from '../../context/verreContext';

const DialogDeleteGlass = ({ openDeleteGlassDialog, setOpenDeleteGlassDialog, selectedRow }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { setListeVerres } = React.useContext(VerreContext);

  const handleCloseDeleteGlassDialog = () => {
    setOpenDeleteGlassDialog(false);
  };

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

    handleCloseDeleteGlassDialog();
  }

  return (
    <Dialog
      open={openDeleteGlassDialog}
      onClose={handleCloseDeleteGlassDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Confirmer la suppression des verres</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Etes vous sûr de vouloir supprimer ces verres définitivement ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteGlassDialog} color='primary'>
          Annuler
        </Button>
        <Button onClick={confirmDeletion} color='primary' autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteGlass;