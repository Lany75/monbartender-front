import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@material-ui/core';
import './DialogModifyIngredient.css';
import { IngredientContext } from "../../context/ingredientContext";

const DialogModifyIngredient = ({ openIngredientQuantityDialog, setOpenIngredientQuantityDialog, chosenIngredient, setChosenIngredient, chosenIngredientId, setchosenIngredientId, chosenQuantity, setChosenQuantity, chosenUnity, setChosenUnity, ingredients, setIngredients }) => {
  const { unitiesList } = React.useContext(IngredientContext);
  const desktop = useMediaQuery('(min-width:769px)');

  const closeModifyIngredientQuantityDialog = () => {
    setchosenIngredientId('');
    setChosenIngredient('');
    setChosenQuantity('');
    setChosenUnity('');
    setOpenIngredientQuantityDialog(false);
  }

  const cancelModifying = () => {
    closeModifyIngredientQuantityDialog();
  }

  const confirmModification = () => {
    const tabIngr = [...ingredients];
    const index = tabIngr.findIndex(ingr => ingr.ingredient === (chosenIngredient))

    if (chosenQuantity === '' || chosenUnity === '') {
      tabIngr.splice(index, 1, { id: chosenIngredientId, ingredient: chosenIngredient, quantite: '', unite: '' })
    } else {
      tabIngr.splice(index, 1, { id: chosenIngredientId, ingredient: chosenIngredient, quantite: chosenQuantity, unite: chosenUnity })
    }
    setIngredients(tabIngr);
    closeModifyIngredientQuantityDialog();
  }

  return (
    <Dialog
      open={openIngredientQuantityDialog}
      onClose={closeModifyIngredientQuantityDialog}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Modification de la quantité</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Modifier la quantité pour l'ingrédient {chosenIngredient}
        </DialogContentText>

        <div className='data-ingredient'>
          <div className='quantity'>
            <TextField
              variant='outlined'
              margin='normal'
              label='quantité'
              name='ingredientQuantity'
              type='number'
              value={chosenQuantity}
              onChange={event => setChosenQuantity(event.target.value)}
              style={{ width: desktop ? 200 : 100 }}
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
                onChange={event => setChosenUnity(event.target.value)}
                label='Unité'
                style={{ width: desktop ? 200 : 120 }}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelModifying} color="primary">
          Annuler
        </Button>
        <Button onClick={confirmModification} color="primary">
          Modifier
        </Button>
      </DialogActions >
    </Dialog >
  )
}

export default DialogModifyIngredient;