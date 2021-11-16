import React from 'react';
import Axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

import apiBaseURL from "../../env";

import { AuthContext } from '../../context/authContext';
import { VerreContext } from '../../context/verreContext';

import camelCaseText from '../../utils/cameCaseText';
import DialogErrorMessage from '../dialogErrorMessage/DialogErrorMessage';

const DialogModifyGlass = ({ openModifyGlassDialog, setOpenModifyGlassDialog, modifiedGlass }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeVerres, setListeVerres } = React.useContext(VerreContext);
  const [newGlassName, setNewGlassName] = React.useState('');
  const [modifiedGlassId, setModifiedGlassId] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const handleCloseModifyGlassDialog = () => {
    setNewGlassName(modifiedGlass.nom);
    setOpenModifyGlassDialog(false);
  };

  const confirmModification = () => {
    const name = newGlassName.replace(/\s+/g, ' ').trim();

    if (name !== modifiedGlass.nom) {

      if (
        !(/\S/.test(name) &&
          name.length >= 2 &&
          name.length <= 30)
      ) {
        setMessage('Le nom doit avoir entre 2 et 30 caractères');
        setOpenErrorMessageDialog(true);
      } else {
        if (
          listeVerres.findIndex(verre => verre.nom === camelCaseText(name)) !== -1
        ) {
          setMessage('Ce verre existe déja');
          setOpenErrorMessageDialog(true)
        }
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

  React.useEffect(() => {
    setNewGlassName(modifiedGlass.nom);
    setModifiedGlassId(modifiedGlass.id);
  }, [modifiedGlass, openModifyGlassDialog])

  return (
    <>
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

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={message}
      />
    </>
  )
}

export default DialogModifyGlass;