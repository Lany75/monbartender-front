import React from "react";
import Axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

import apiBaseURL from "../../env";

import { AuthContext } from '../../context/authContext';
import { VerreContext } from '../../context/verreContext';
import DialogErrorMessage from "../dialogErrorMessage/DialogErrorMessage";

import camelCaseText from '../../utils/cameCaseText';

const DialogAddNewGlass = ({ openAddNewGlassDialog, setOpenAddewGlassDialog }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeVerres, setListeVerres } = React.useContext(VerreContext);
  const [newGlassName, setNewGlassName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const handleCloseAddNewGlassDialog = () => {
    setOpenAddewGlassDialog(false);
  }

  const cancelAdding = () => {
    setNewGlassName('');
    handleCloseAddNewGlassDialog();
  }

  const confirmAdding = () => {
    const name = newGlassName.replace(/\s+/g, ' ').trim();

    if (
      !(/\S/.test(name) &&
        name.length >= 2 &&
        name.length <= 30)
    ) {
      setMessage('Le nom doit avoir entre 2 et 30 caractères');
      setOpenErrorMessageDialog(true);
    }
    else {
      if (
        listeVerres.findIndex(verre => verre.nom === camelCaseText(name)) !== -1
      ) {
        setMessage('Ce verre existe déja');
        setOpenErrorMessageDialog(true);
      }
      else {
        setMessage('');
        Axios.post(`${apiBaseURL}/api/v2/glasses`,
          { nom: name },
          {
            headers: {
              authorization: accessToken
            }
          })
          .then(reponse => {
            setListeVerres(reponse.data);
            setNewGlassName('');
          })
          .catch(error => {
            console.log("vous avez une erreur : ", error);
          });
      }
    }

    handleCloseAddNewGlassDialog();
  }

  return (
    <>
      <Dialog
        open={openAddNewGlassDialog}
        onClose={handleCloseAddNewGlassDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajout d'un nouveau verre</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Indiquez le nom du verre
          </DialogContentText>
          <TextField
            autoFocus
            variant='outlined'
            margin='normal'
            label="Nom du verre"
            value={newGlassName}
            onChange={event => setNewGlassName(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelAdding} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmAdding} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={message}
      />
    </>
  )
}

export default DialogAddNewGlass;