import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@material-ui/core';
import './CocktailAddIngredients.css';
import { IngredientContext } from "../../context/ingredientContext";

const CocktailAddIngredients = () => {
  const [ingredients, setIngredients] = React.useState([])
  const { listeIngredients, unitiesList } = React.useContext(IngredientContext);
  const desktop = useMediaQuery('(min-width:769px)');
  const [pageSize, setPageSize] = React.useState(5);
  const [openAddNewIngredientDialog, setOpenAddNewIngredientDialog] = React.useState(false);
  const [openIngredientQuantityDialog, setOpenIngredientQuantityDialog] = React.useState(false);
  const [chosenIngredientId, setchosenIngredientId] = React.useState('');
  const [chosenIngredient, setChosenIngredient] = React.useState('');
  const [chosenQuantity, setChosenQuantity] = React.useState('');
  const [chosenUnity, setChosenUnity] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [selectedRow, setSelectedRow] = React.useState([]);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: desktop ? 200 : 100,
      hide: !desktop && true
    },
    {
      field: 'ingredient',
      headerName: 'Ingredient',
      width: desktop ? 200 : 150,
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
      width: desktop ? 140 : 100,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'quantite') || ''} ${params.getValue(params.id, 'unite') || ''
        }`,
    }
  ];

  const closeDialog = () => {
    setchosenIngredientId('');
    setChosenIngredient('');
    setChosenQuantity('');
    setChosenUnity('');
    handleCloseAddNewIngredientDialog();
  }

  const handleCloseAddNewIngredientDialog = () => {
    setOpenAddNewIngredientDialog(false);
  };

  const handleClickOpenaddNewIngredientDialog = (event) => {
    setOpenAddNewIngredientDialog(true);
  }

  const handleChangeChosenIngredient = (event) => {
    setchosenIngredientId(listeIngredients.find(element => element.nom === event.target.value).id)
    setChosenIngredient(event.target.value);
  };

  const handleChangeChosenUnity = (event) => {
    setChosenUnity(event.target.value);
  };

  const addIngredient = () => {
    if (chosenIngredient !== '') {
      const tabIngr = [...ingredients];

      if (
        tabIngr.findIndex(ingr => ingr.ingredient === (chosenIngredient)) !== -1
      ) setMessage('Ingrédient déja ajouté');
      else {
        setMessage('');
        tabIngr.push({ id: chosenIngredientId, ingredient: chosenIngredient, quantite: chosenQuantity, unite: chosenUnity })
        setIngredients(tabIngr);
      }
      closeDialog();
    }
  }

  const cancelAdding = () => {
    setMessage('');
    closeDialog();
  }

  const deleteIngredients = () => {
    if (selectedRow.length > 0) {
      const tabIngr = [...ingredients];
      selectedRow.forEach(id => {
        tabIngr.splice(tabIngr.findIndex(ingr => ingr.id === id), 1)
      })
      setIngredients(tabIngr);
    } else setMessage('Aucun ingrédient sélectionné')
  }

  const selectRow = (event) => {
    setSelectedRow(event);
    setMessage('');
  }

  const openModifyIngredientQuantityDialog = (event) => {
    console.log(event.row);
    setchosenIngredientId(event.row.id);
    setChosenIngredient(event.row.ingredient);
    setChosenQuantity(event.row.quantite);
    setChosenUnity(event.row.unite);
    setOpenIngredientQuantityDialog(true)
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
      <div className='cocktail-add-ingredients-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
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
          onClick={handleClickOpenaddNewIngredientDialog}
        >
          Ajouter un ingrédient
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteIngredients}
        >
          Supprimer les ingrédients
        </Button>
        <div className='message'>{message}</div>
      </div>

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
          <Button onClick={cancelAdding} color="primary">
            Annuler
          </Button>
          <Button onClick={addIngredient} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

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

export default CocktailAddIngredients;