import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, useMediaQuery } from '@material-ui/core';

import './ManageCocktails.css';
import { CocktailContext } from '../../context/cocktailContext';
import ImageCocktail from '../imageCocktail/ImageCocktail';
import DialogAddCocktail from '../dialogAddCocktail/DialogAddCocktail';
import DialogErrorMessage from '../dialogErrorMessage/DialogErrorMessage';
import DialogDeleteCocktail from '../dialogDeleteCocktail/DialogDeleteCocktail';

const ManageCocktails = () => {
  const { listeCocktails } = React.useContext(CocktailContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const desktop = useMediaQuery('(min-width:769px)');
  const [openDeleteCocktailDialog, setOpenDeleteCocktailDialog] = React.useState(false);
  const [openModifyCocktailDialog, setOpenModifyCocktailDialog] = React.useState(false);
  const [openAddCocktailDialog, setOpenAddCocktailDialog] = React.useState(false);
  const [newCocktailName, setNewCocktailName] = React.useState('');
  const [newTypeCocktail, setNewTypeCocktail] = React.useState('false');
  const [oldCocktail, setOldCocktail] = React.useState({});
  const [newRefChosenImage, setNewRefChosenImage] = React.useState('img_cocktail/noImageFound.jpg')
  const [newPhoto, setNewPhoto] = React.useState(null);
  const [newChosenGlass, setNewChosenGlass] = React.useState('');
  const [newIngredients, setNewIngredients] = React.useState([])
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: desktop ? 240 : 100,
      hide: !desktop && true
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: desktop ? 240 : 170,
    },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 120,
      renderCell: params => (
        <ImageCocktail
          classe='manage-cocktail-image'
          reference={params.row.photo}
          nom={params.row.nom}
        />
      )
    }
  ];


  const selectRow = (event) => {
    setSelectedRow(event);
  }

  const deleteCocktails = () => {
    if (selectedRow.length > 0) handleOpenDeleteCocktailDialog();
    else setOpenErrorMessageDialog(true);
  }

  const handleOpenDeleteCocktailDialog = () => {
    setOpenDeleteCocktailDialog(true);
  };

  const handleOpenModifyGlassDialog = (event) => {
    console.log(event.row);
    setOldCocktail(event.row);
    setNewCocktailName(event.row.nom);
    setNewTypeCocktail('' + event.row.alcool);
    setNewRefChosenImage(event.row.photo);
    setNewChosenGlass(event.row.Verre.nom)
    setOpenModifyCocktailDialog(true);
  }

  const handleCloseModifyCocktailDialog = () => {
    setOpenModifyCocktailDialog(false);
  }

  const confirmModification = () => {
    console.log(oldCocktail);
    console.log(newCocktailName);
    console.log(newTypeCocktail);
    console.log(newRefChosenImage);
    console.log(newPhoto);
    console.log(newChosenGlass);

    handleCloseModifyCocktailDialog();
  }

  const handleOpenAddCocktailDialog = () => {
    setOpenAddCocktailDialog(true);
  }

  return (
    <div className='manage-cocktails'>
      <h4>LES COCKTAILS</h4>
      <div className='manage-cocktails-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={listeCocktails}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectRow}
          onCellClick={handleOpenModifyGlassDialog}
        />
      </div>

      <div className='add-delete-cocktails'>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteCocktails}
        >
          Supprimer les cocktails
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddCocktailDialog}
        >
          Ajouter un cocktail
        </Button>
      </div>

      {/*<Dialog
        open={openModifyCocktailDialog}
        onClose={handleCloseModifyCocktailDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier le cocktail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Corrigez les données du cocktail
          </DialogContentText>
          <CocktailAddNameType
            cocktailName={newCocktailName}
            setcocktailName={setNewCocktailName}
            typeCocktail={newTypeCocktail}
            setTypeCocktail={setNewTypeCocktail}
          />
          <CocktailAddPhoto
            refChosenImage={newRefChosenImage}
            setRefChosenImage={setNewRefChosenImage}
            setPhoto={setNewPhoto}
          />
          <CocktailAddGlass
            chosenGlass={newChosenGlass}
            setChosenGlass={setNewChosenGlass}
          />
          <CocktailAddIngredients
            ingredients={newIngredients}
            setIngredients={setNewIngredients}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModifyCocktailDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmModification} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>*/}

      <DialogAddCocktail
        openAddCocktailDialog={openAddCocktailDialog}
        setOpenAddCocktailDialog={setOpenAddCocktailDialog}
      />

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={'Aucun cocktail sélectionné'}
      />

      <DialogDeleteCocktail
        openDeleteCocktailDialog={openDeleteCocktailDialog}
        setOpenDeleteCocktailDialog={setOpenDeleteCocktailDialog}
        selectedRow={selectedRow}
      />
    </div>
  )
}

export default ManageCocktails;