import React from "react";
import Axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import apiBaseURL from "../../env";

import './DialogModifyIngredient.css';
import { IngredientContext } from "../../context/ingredientContext";
import { AuthContext } from '../../context/authContext';
import DialogErrorMessage from "../dialogErrorMessage/DialogErrorMessage";

import camelCaseText from '../../utils/cameCaseText';

const DialogModifyIngredient = ({ openModifyIngredientDialog, setOpenModifyIngredientDialog, modifiedIngredient }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeIngredients, setListeIngredients, listeCategoriesIngredients } = React.useContext(IngredientContext);
  const [modifiedIngredientId, setModifiedIngredientId] = React.useState('');
  const [newIngredientName, setNewIngredientName] = React.useState('');
  const [newIngredientCategorie, setNewIngredientCategorie] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const handleCloseModifyIngredientDialog = () => {
    setOpenModifyIngredientDialog(false);
  };

  const handleChangeCategorie = (event) => {
    setNewIngredientCategorie(event.target.value);
  };

  const confirmModification = () => {
    const name = newIngredientName.replace(/\s+/g, ' ').trim();

    if (name !== modifiedIngredient.nom || newIngredientCategorie !== modifiedIngredient.categorie) {
      if (
        !(/\S/.test(name) &&
          name.length >= 2 &&
          name.length <= 30)
      ) {
        setMessage('Le nom doit avoir entre 2 et 30 caractères');
        setOpenErrorMessageDialog(true);
      } else {
        const indexIngr = listeIngredients.findIndex(ingr => ingr.nom === camelCaseText(name));
        if (
          indexIngr !== -1 &&
          listeIngredients[indexIngr].id !== modifiedIngredientId
        ) {
          setMessage('Cet ingrédient existe déja');
          setOpenErrorMessageDialog(true);
        }
        else {
          Axios.put(`${apiBaseURL}/api/v2/ingredients/${modifiedIngredientId}`,
            { nom: name, categorie: newIngredientCategorie },
            {
              headers: {
                authorization: accessToken
              }
            })
            .then(reponse => {
              setListeIngredients(reponse.data);
            })
            .catch(error => {
              console.log("vous avez une erreur : ", error);
            });
        }
      }
    }

    handleCloseModifyIngredientDialog();
  }

  React.useEffect(() => {
    setNewIngredientName(modifiedIngredient.nom);
    setNewIngredientCategorie(modifiedIngredient.categorie);
    setModifiedIngredientId(modifiedIngredient.id);
  }, [modifiedIngredient, openModifyIngredientDialog])

  return (
    <>
      <Dialog
        open={openModifyIngredientDialog}
        onClose={handleCloseModifyIngredientDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier l'ingrédient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Corrigez le nom et/ou la catégorie de l'ingrédient
          </DialogContentText>

          <div className='data-modified-ingredient'>
            <div className='name'>
              <TextField
                autoFocus
                variant='outlined'
                margin='normal'
                label="Nom de l'ingrédient"
                value={newIngredientName}
                onChange={event => setNewIngredientName(event.target.value)}
              />
            </div>
            <div className='categorie'>
              <FormControl variant='outlined' id='form-control'>
                <InputLabel id='label-categorie'>Catégorie</InputLabel>
                <Select
                  className='form-control-select'
                  labelId='select-categorie'
                  id='select-categorie'
                  value={newIngredientCategorie}
                  onChange={handleChangeCategorie}
                  label='Catégorie'
                  style={{ width: 220 }}
                  required
                >
                  {listeCategoriesIngredients && listeCategoriesIngredients.map(lci => {
                    return (
                      <MenuItem value={lci.nom} key={lci.id}>{lci.nom}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModifyIngredientDialog} color="primary">
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

export default DialogModifyIngredient;