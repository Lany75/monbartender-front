import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@material-ui/core';
import './DialogAddNewIngredient.css';
import { IngredientContext } from "../../context/ingredientContext";
import DialogErrorMessage from "../dialogErrorMessage/DialogErrorMessage";

const DialogAddNewIngredient = ({ openAddNewIngredientDialog, setOpenAddNewIngredientDialog, ingredients, setIngredients }) => {
  const { listeIngredients, unitiesList } = React.useContext(IngredientContext);
  const desktop = useMediaQuery('(min-width:769px)');
  const [chosenIngredientId, setchosenIngredientId] = React.useState('');
  const [chosenIngredient, setChosenIngredient] = React.useState('');
  const [chosenQuantity, setChosenQuantity] = React.useState('');
  const [chosenUnity, setChosenUnity] = React.useState('');
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const handleCloseAddNewIngredientDialog = () => {
    setOpenAddNewIngredientDialog(false);
  };

  const handleChangeChosenIngredient = (event) => {
    setchosenIngredientId(listeIngredients.find(element => element.nom === event.target.value).id)
    setChosenIngredient(event.target.value);
  };

  const handleChangeChosenUnity = (event) => {
    setChosenUnity(event.target.value);
  };

  const cancelAdding = () => {
    closeDialog();
  }

  const closeDialog = () => {
    setchosenIngredientId('');
    setChosenIngredient('');
    setChosenQuantity('');
    setChosenUnity('');
    handleCloseAddNewIngredientDialog();
  }

  const addIngredient = () => {
    if (chosenIngredient !== '') {
      const tabIngr = [...ingredients];

      if (
        tabIngr.findIndex(ingr => ingr.ingredient === (chosenIngredient)) !== -1
      ) setOpenErrorMessageDialog(true);
      else {
        if (chosenQuantity === '' || chosenUnity === '') {
          tabIngr.push({ id: chosenIngredientId, ingredient: chosenIngredient, quantite: '', unite: '' })
        } else {
          tabIngr.push({ id: chosenIngredientId, ingredient: chosenIngredient, quantite: chosenQuantity, unite: chosenUnity })
        }
        setIngredients(tabIngr);
      }
      closeDialog();
    }
  }

  return (
    <>
      <Dialog
        open={openAddNewIngredientDialog}
        onClose={handleCloseAddNewIngredientDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajout d'ingrédient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choisissez l'ingrédient à ajouter
          </DialogContentText>

          <div className='data-new-ingredient'>
            <div className='ingredient-name'>
              <FormControl variant='outlined' >
                <InputLabel id='label-ingredient'>Ingrédient</InputLabel>
                <Select
                  className='form-control-select'
                  labelId='select-ingredient'
                  id='select-ingredient'
                  value={chosenIngredient}
                  onChange={handleChangeChosenIngredient}
                  label='Ingredient'
                  style={{ width: desktop ? 200 : 240 }}
                >
                  {listeIngredients && listeIngredients.map(ingredient => {
                    return (
                      <MenuItem value={ingredient.nom} key={ingredient.id}>{ingredient.nom} </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>

            <div className='quantity-unity'>
              <div className='quantity'>
                <TextField
                  variant='outlined'
                  margin='normal'
                  label='quantité'
                  name='ingredientQuantity'
                  type='number'
                  value={chosenQuantity}
                  onChange={event => setChosenQuantity(event.target.value)}
                  style={{ width: 100 }}
                />
              </div>
              <div className='unity'>
                <FormControl variant='outlined' >
                  <InputLabel id='label-unity'>Unité</InputLabel>
                  <Select
                    className='form-control-select'
                    labelId='select-unity'
                    id='select-unity'
                    value={chosenUnity}
                    onChange={handleChangeChosenUnity}
                    label='Unité'
                    style={{ width: desktop ? 150 : 120 }}
                  >
                    {unitiesList && unitiesList.map(unity => {
                      return (
                        <MenuItem value={unity.nom} key={unity.id}>{unity.nom}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelAdding} color="primary">
            Annuler
          </Button>
          <Button onClick={addIngredient} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={'Ingrédient déja ajouté'}
      />
    </>
  )
}

export default DialogAddNewIngredient;