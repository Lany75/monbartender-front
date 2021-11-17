import React from "react";
import Axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import apiBaseURL from "../../env";

import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';
import { BarContext } from '../../context/barContext';

const DialogDeleteIngredient = ({ openDeleteIngredientDialog, setOpenDeleteIngredientDialog, selectedRow }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { getBarUser } = React.useContext(BarContext);
  const { setListeIngredients } = React.useContext(IngredientContext);

  const handleCloseDeleteIngredientsDialog = () => {
    setOpenDeleteIngredientDialog(false);
  };

  const confirmDeletion = () => {
    Axios.delete(`${apiBaseURL}/api/v2/ingredients/`,
      {
        headers: {
          authorization: accessToken
        },
        data: { deletedIngredients: selectedRow }
      })
      .then(reponse => {
        setListeIngredients(reponse.data);
        getBarUser();
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    handleCloseDeleteIngredientsDialog();
  }

  return (
    <Dialog
      open={openDeleteIngredientDialog}
      onClose={handleCloseDeleteIngredientsDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Confirmer la suppression des ingrédients</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Etes vous sûr de vouloir supprimer ces ingrédients définitivement ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteIngredientsDialog} color='primary'>
          Annuler
        </Button>
        <Button onClick={confirmDeletion} color='primary' autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteIngredient;