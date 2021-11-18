import React from "react";
import Axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import apiBaseURL from "../../env";

import './DialogAddNewIngredient.css';
import { AuthContext } from '../../context/authContext';
import { IngredientContext } from '../../context/ingredientContext';
import DialogErrorMessage from "../dialogErrorMessage/DialogErrorMessage";

import camelCaseText from '../../utils/cameCaseText';

const DialogAddNewIngredient = ({ openAddNewIngredientDialog, setOpenAddNewIngredientDialog }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeIngredients, listeCategoriesIngredients, setListeIngredients } = React.useContext(IngredientContext);
  const [ingredientName, setIngredientName] = React.useState('');
  const [ingredientCategorie, setIngredientCategorie] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const handleCloseAddNewIngredientDialog = () => {
    setOpenAddNewIngredientDialog(false);
  }

  const cancelAdding = () => {
    setIngredientName('');
    setIngredientCategorie('');
    handleCloseAddNewIngredientDialog();
  }

  const confirmAdding = () => {
    const name = ingredientName.replace(/\s+/g, ' ').trim();

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
        listeIngredients.findIndex(ingr => ingr.nom === camelCaseText(name)) !== -1
      ) {
        setMessage('Cet ingrédient existe déja');
        setIngredientName('');
        setIngredientCategorie('');
        setOpenErrorMessageDialog(true);
      }
      else {
        if (ingredientCategorie === '') {
          setMessage('La catégorie est obligatoire');
          setOpenErrorMessageDialog(true);
        } else {
          Axios.post(`${apiBaseURL}/api/v2/ingredients/`,
            { nom: name, categorie: ingredientCategorie },
            {
              headers: {
                authorization: accessToken
              }
            })
            .then(reponse => {
              setListeIngredients(reponse.data);
              setIngredientName('');
              setIngredientCategorie('');
            })
            .catch(error => {
              console.log("vous avez une erreur : ", error);
            });
        }
      }
    }
    handleCloseAddNewIngredientDialog();
  }

  return (
    <>
      <Dialog
        open={openAddNewIngredientDialog}
        onClose={handleCloseAddNewIngredientDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajout d'un nouvel ingrédient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Indiquez le nom et la catégorie de l'ingrédient
          </DialogContentText>

          <div className='data-added-ingredient'>
            <div className='name'>
              <TextField
                variant='outlined'
                margin='normal'
                label='Nouvel ingrédient'
                name='ingredientName'
                value={ingredientName}
                onChange={event => setIngredientName(event.target.value)}
                style={{ width: 220 }}
              />
            </div>
            <div className='categorie'>
              <FormControl variant='outlined' >
                <InputLabel id='label-categorie'>Catégorie</InputLabel>
                <Select
                  className='form-control-select'
                  labelId='select-categorie'
                  id='select-categorie'
                  value={ingredientCategorie}
                  onChange={event => setIngredientCategorie(event.target.value)}
                  label='Catégorie'
                  style={{ width: 220 }}
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

export default DialogAddNewIngredient;