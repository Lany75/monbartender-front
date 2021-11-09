import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@material-ui/core';
import './CocktailIngredients.css';
import { IngredientContext } from "../../context/ingredientContext";
import DialogAddNewIngredient from "../dialogAddNewIngredient/DialogAddNewIngredient";
import DialogErrorMessage from "../dialogErrorMessage/DialogErrorMessage";

const CocktailIngredients = ({ ingredients, setIngredients }) => {
  const { unitiesList } = React.useContext(IngredientContext);
  const desktop = useMediaQuery('(min-width:769px)');
  const [pageSize, setPageSize] = React.useState(5);
  const [openAddNewIngredientDialog, setOpenAddNewIngredientDialog] = React.useState(false);
  const [openIngredientQuantityDialog, setOpenIngredientQuantityDialog] = React.useState(false);
  const [chosenIngredientId, setchosenIngredientId] = React.useState('');
  const [chosenIngredient, setChosenIngredient] = React.useState('');
  const [chosenQuantity, setChosenQuantity] = React.useState('');
  const [chosenUnity, setChosenUnity] = React.useState('');
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: desktop ? 100 : 80,
      hide: !desktop && true
    },
    {
      field: 'ingredient',
      headerName: 'Ingredient',
      width: desktop ? 190 : 95,
    },
    {
      field: 'quantite',
      headerName: 'Quantite',
      hide: true
    },
    {
      field: 'unite',
      headerName: 'Unite',
      hide: true
    },
    {
      field: 'quantiteUnite',
      headerName: 'Quantite',
      width: desktop ? 140 : 95,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'quantite') || ''} ${params.getValue(params.id, 'unite') || ''
        }`,
    }
  ];

  const handleClickOpenAddNewIngredientDialog = (event) => {
    setOpenAddNewIngredientDialog(true);
  }

  const handleChangeChosenUnity = (event) => {
    setChosenUnity(event.target.value);
  };

  const deleteIngredients = () => {
    if (selectedRow.length > 0) {
      const tabIngr = [...ingredients];
      selectedRow.forEach(id => {
        tabIngr.splice(tabIngr.findIndex(ingr => ingr.id === id), 1)
      })
      setIngredients(tabIngr);
    } else setOpenErrorMessageDialog(true);
  }

  const selectRow = (event) => {
    setSelectedRow(event);
  }

  const openModifyIngredientQuantityDialog = (event) => {
    setchosenIngredientId(event.row.id);
    setChosenIngredient(event.row.ingredient);
    setChosenQuantity(event.row.quantite);
    setChosenUnity(event.row.unite);
    setOpenIngredientQuantityDialog(true);
  }

  const closeModifyIngredientQuantityDialog = () => {
    setchosenIngredientId('');
    setChosenIngredient('');
    setChosenQuantity('');
    setChosenUnity('');
    setOpenIngredientQuantityDialog(false);
  };

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
    <div className='cocktail-add-ingredients'>
      <div className='cocktail-ingredients-list' style={{ height: 110 + pageSize * 52, width: '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={ingredients}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectRow}
          onCellClick={openModifyIngredientQuantityDialog}
        />
      </div>
      <div className='add-delete-ingredients'>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpenAddNewIngredientDialog}
          id='add-button'
        >
          Ajouter un ingrédient
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteIngredients}
          id='add-button'
        >
          Supprimer les ingrédients
        </Button>
      </div>

      <DialogAddNewIngredient
        openAddNewIngredientDialog={openAddNewIngredientDialog}
        setOpenAddNewIngredientDialog={setOpenAddNewIngredientDialog}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={'Aucun ingrédient sélectionné'}
      />

      <Dialog
        open={openIngredientQuantityDialog}
        onClose={closeModifyIngredientQuantityDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modification de la quantité</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifier la quantité pour l'ingrédient {chosenIngredient}
          </DialogContentText>

          <div className='data-new-ingredient'>
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

            <div className='quantity-unity'>
              <FormControl variant='outlined' >
                <InputLabel id='label-unity'>Unité</InputLabel>
                <Select
                  className='form-control-select'
                  labelId='select-unity'
                  id='select-unity'
                  value={chosenUnity}
                  onChange={handleChangeChosenUnity}
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
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CocktailIngredients;