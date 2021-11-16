import React from "react";
import Axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { CocktailContext } from "../../context/cocktailContext";
import { AuthContext } from "../../context/authContext";

import { refStorage } from "../../firebaseConfig";
import apiBaseURL from "../../env";

const DialogDeleteCocktail = ({ openDeleteCocktailDialog, setOpenDeleteCocktailDialog, selectedRow }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { setListeCocktails } = React.useContext(CocktailContext);

  const handleCloseDeleteCocktailDialog = () => {
    setOpenDeleteCocktailDialog(false);
  };

  const confirmDeletion = () => {
    Axios.delete(`${apiBaseURL}/api/v2/cocktails/`,
      {
        headers: {
          authorization: accessToken
        },
        data: { deletedCocktails: selectedRow }
      })
      .then(reponse => {
        deleteImageOnFirebase(reponse.data.images);
        setListeCocktails(reponse.data.cocktails);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    handleCloseDeleteCocktailDialog();
  }

  const deleteImageOnFirebase = refTab => {
    refTab.forEach(ref => {
      if (ref !== 'img_cocktail/noImageFound.jpg') {
        // initialisation de la référence de l'image
        const imgRef = refStorage.child(ref);

        imgRef.delete().then(() => {
          console.log('photo supprimée de firebase')
        })
          .catch((err) => {
            console.log("error deleting file", err);
          });
      }
    })
  }

  return (
    <Dialog
      open={openDeleteCocktailDialog}
      onClose={handleCloseDeleteCocktailDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Confirmer la suppression des cocktails</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Etes vous sûr de vouloir supprimer ces cocktails définitivement ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteCocktailDialog} color='primary'>
          Annuler
        </Button>
        <Button onClick={confirmDeletion} color='primary' autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteCocktail;