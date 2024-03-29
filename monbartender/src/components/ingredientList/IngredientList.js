import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, useMediaQuery } from '@material-ui/core';

import './IngredientList.css';
import { IngredientContext } from '../../context/ingredientContext';
import DialogDeleteIngredient from '../dialogDeleteIngredient/DialogDeleteIngredient';
import DialogModifyIngredient from '../dialogModifyIngredient/DialogModifyIngredient';
import DialogAddNewIngredient from '../dialogAddNewIngredient/DialogAddNewIngredient';
import DialogErrorMessage from '../dialogErrorMessage/DialogErrorMessage';

const IngredientList = () => {
  const desktop = useMediaQuery('(min-width:769px)');
  const { listeIngredients } = React.useContext(IngredientContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);
  const [clickedIngredient, setClickedIngredient] = React.useState({});
  const [openModifyIngredientDialog, setOpenModifyIngredientDialog] = React.useState(false);
  const [openDeleteIngredientDialog, setOpenDeleteIngredientDialog] = React.useState(false);
  const [openAddNewIngredientDialog, setOpenAddNewIngredientDialog] = React.useState(false);
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: desktop ? 200 : 100,
      hide: !desktop && true
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: desktop ? 200 : 150,
    },
    {
      field: 'categorie',
      headerName: 'Catégorie',
      width: desktop ? 200 : 150,
    }
  ];

  const handleOpenModifyIngredientDialog = (event) => {
    setClickedIngredient(event.row);
    setOpenModifyIngredientDialog(true);
  };

  const selectRow = (event) => {
    setSelectedRow(event);
  }

  const handleOpenDeleteIngredientsDialog = () => {
    setOpenDeleteIngredientDialog(true);
  };

  const deleteIngredients = () => {
    if (selectedRow.length > 0) handleOpenDeleteIngredientsDialog();
    else setOpenErrorMessageDialog(true);
  }

  const addIngredient = () => {
    setOpenAddNewIngredientDialog(true);
  }

  React.useEffect(() => {
    const ingredientTab = []
    listeIngredients && listeIngredients.forEach(ingr => {
      ingredientTab.push({ id: ingr.id, nom: ingr.nom, categorie: ingr.CategorieIngredient.nom })
    })
    setIngredients(ingredientTab);
  }, [listeIngredients]);

  return (
    <>
      <div className='ingredients-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
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
          onCellClick={handleOpenModifyIngredientDialog}
        />
      </div>

      <div className='delete-ingredients'>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteIngredients}
        >
          Supprimer les ingrédients
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={addIngredient}
        >
          Ajouter un ingrédient
        </Button>
      </div>

      <DialogDeleteIngredient
        openDeleteIngredientDialog={openDeleteIngredientDialog}
        setOpenDeleteIngredientDialog={setOpenDeleteIngredientDialog}
        selectedRow={selectedRow}
      />

      <DialogModifyIngredient
        openModifyIngredientDialog={openModifyIngredientDialog}
        setOpenModifyIngredientDialog={setOpenModifyIngredientDialog}
        modifiedIngredient={clickedIngredient}
      />

      <DialogAddNewIngredient
        openAddNewIngredientDialog={openAddNewIngredientDialog}
        setOpenAddNewIngredientDialog={setOpenAddNewIngredientDialog}
      />

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={'Aucun ingrédient sélectionné'}
      />
    </>
  );
}

export default IngredientList;