import React from 'react';
import Axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@material-ui/core";

import apiBaseURL from "../../env";

import { BarContext } from '../../context/barContext';
import './UserBarIngredientList.css'
import { AuthContext } from '../../context/authContext';

const UserBarIngredientList = ({ message, setMessage }) => {
  const { bar, setBar } = React.useContext(BarContext);
  const { accessToken } = React.useContext(AuthContext);
  const [ingredients, setIngredients] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const desktop = useMediaQuery('(min-width:769px)');

  const columns = [
    {
      field: 'ingredientName',
      headerName: 'Ingrédient',
      width: desktop ? 300 : 150,
    },
    {
      field: 'categoryName',
      headerName: 'Catégorie',
      width: desktop ? 300 : 150,
    }
  ];

  const selectRow = (event) => {
    setSelectedRow(event);
    setMessage('');
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteIngredients = () => {
    if (selectedRow.length > 0) handleClickOpen();
    else setMessage('Aucun ingrédient sélectionné')
  }

  const confirmDeletion = () => {
    Axios.delete(`${apiBaseURL}/api/v2/barsIgredients/`, {
      headers: {
        authorization: accessToken
      },
      data: { deletedIngredients: selectedRow }
    })
      .then(reponse => {
        setBar(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    handleClose();
  }

  React.useEffect(() => {
    const rows = [];
    bar && bar.Ingredients.forEach(ingredient => {
      rows.push({ id: ingredient.id, ingredientName: ingredient.nom, categoryName: ingredient.CategorieIngredient.nom })
    })
    setIngredients(rows);
  }, [bar])

  return (
    <>
      <div className='ingredients-list-title'>Mon Bar</div>
      <div className='ingredients-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={ingredients}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          onSelectionModelChange={selectRow}
        />
      </div>
      <div className='delete-ingredient-bar'>
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
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirmer la suppression des ingrédients'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Etes vous sûr de vouloir supprimer ces ingrédients de votre bar ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Annuler
          </Button>
          <Button onClick={confirmDeletion} color='primary' autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserBarIngredientList;