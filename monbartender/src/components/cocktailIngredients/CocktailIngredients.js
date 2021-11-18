import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import { Button, useMediaQuery } from '@material-ui/core';
import './CocktailIngredients.css';
import DialogAddIngredientOfCocktail from "../dialogAddIngredientOfCocktail/DialogAddIngredientOfCocktail";
import DialogErrorMessage from "../dialogErrorMessage/DialogErrorMessage";
import DialogModifyIngredientOfCocktail from "../dialogModifyIngredientOfCocktail/DialogModifyIngredientOfCocktail";

const CocktailIngredients = ({ ingredients, setIngredients }) => {
  const desktop = useMediaQuery('(min-width:769px)');
  const [pageSize, setPageSize] = React.useState(5);
  const [chosenIngredientId, setchosenIngredientId] = React.useState('');
  const [chosenIngredient, setChosenIngredient] = React.useState('');
  const [chosenQuantity, setChosenQuantity] = React.useState('');
  const [chosenUnity, setChosenUnity] = React.useState('');
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [openAddNewIngredientDialog, setOpenAddNewIngredientDialog] = React.useState(false);
  const [openIngredientQuantityDialog, setOpenIngredientQuantityDialog] = React.useState(false);
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

      <DialogAddIngredientOfCocktail
        openAddNewIngredientDialog={openAddNewIngredientDialog}
        setOpenAddNewIngredientDialog={setOpenAddNewIngredientDialog}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <DialogModifyIngredientOfCocktail
        openIngredientQuantityDialog={openIngredientQuantityDialog}
        setOpenIngredientQuantityDialog={setOpenIngredientQuantityDialog}
        chosenIngredient={chosenIngredient}
        setChosenIngredient={setChosenIngredient}
        chosenIngredientId={chosenIngredientId}
        setchosenIngredientId={setchosenIngredientId}
        chosenQuantity={chosenQuantity}
        setChosenQuantity={setChosenQuantity}
        chosenUnity={chosenUnity}
        setChosenUnity={setChosenUnity}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={'Aucun ingrédient sélectionné'}
      />
    </div>
  )
}

export default CocktailIngredients;