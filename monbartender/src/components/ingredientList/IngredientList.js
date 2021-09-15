import React from 'react';
import Axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@material-ui/core';

import apiBaseURL from "../../env";

import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';
import { BarContext } from '../../context/barContext';
import './IngredientList.css';

import camelCaseText from '../../utils/cameCaseText';

const IngredientList = ({ message, setMessage }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { getBarUser } = React.useContext(BarContext);
  const { listeIngredients, setListeIngredients, listeCategoriesIngredients } = React.useContext(IngredientContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [openModifyIngredientDialog, setOpenModifyIngredientDialog] = React.useState(false);
  const [openDeleteIngredientDialog, setOpenDeleteIngredientDialog] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);
  const [modifiedIngredientId, setModifiedIngredientId] = React.useState('');
  const [oldIngredientName, setOldIngredientName] = React.useState('');
  const [newIngredientName, setNewIngredientName] = React.useState('');
  const [oldIngredientCategorie, setOldIngredientCategorie] = React.useState('');
  const [newIngredientCategorie, setNewIngredientCategorie] = React.useState('');
  const desktop = useMediaQuery('(min-width:769px)');

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

  const handleChangeCategorie = (event) => {
    setNewIngredientCategorie(event.target.value);
  };
  const handleClickOpenModifyIngredientDialog = (event) => {
    setMessage('');
    setModifiedIngredientId(event.row.id);
    setOldIngredientName(event.row.nom);
    setNewIngredientName(event.row.nom);
    setOldIngredientCategorie(event.row.categorie);
    setNewIngredientCategorie(event.row.categorie);
    setOpenModifyIngredientDialog(true);
  };
  const handleCloseModifyIngredientDialog = () => {
    setOpenModifyIngredientDialog(false);
  };
  const confirmModification = () => {
    if (newIngredientName !== oldIngredientName || newIngredientCategorie !== oldIngredientCategorie) {
      const name = newIngredientName.replace(/\s+/g, ' ').trim();
      if (
        !(/\S/.test(name) &&
          name.length >= 2 &&
          name.length <= 30)
      ) setMessage('Le nom doit avoir entre 2 et 30 caractères');
      else {
        const indexIngr = listeIngredients.findIndex(ingr => ingr.nom === camelCaseText(name));
        if (indexIngr !== -1 && listeIngredients[indexIngr].id !== modifiedIngredientId) setMessage('Cet ingrédient existe déja');
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

  const selectRow = (event) => {
    setSelectedRow(event);
    setMessage('');
  }
  const handleCloseDeleteIngredientsDialog = () => {
    setOpenDeleteIngredientDialog(false);
  };
  const handleClickOpenDeleteIngredientsDialog = () => {
    setOpenDeleteIngredientDialog(true);
  };
  const deleteIngredients = () => {
    if (selectedRow.length > 0) handleClickOpenDeleteIngredientsDialog();
    else setMessage('Aucun ingrédient sélectionné')
  }

  const confirmDeletion = () => {
    Axios.delete(`${apiBaseURL}/api/v2/ingredients/`,
      {
        headers: {
          authorization: accessToken
        },
        data: { deletedIngredients: selectedRow }
      })
      .then(reponse => {
        setListeIngredients(reponse.data);
        getBarUser();
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    handleCloseDeleteIngredientsDialog();
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
      <div className='igredients-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
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
          onCellClick={handleClickOpenModifyIngredientDialog}
        />
      </div>

      <Dialog
        open={openModifyIngredientDialog}
        onClose={handleCloseModifyIngredientDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier l'ingrédient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Corrigez le nom et/ou la catégorie de l'ingrédient
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de l'ingrédient"
            value={newIngredientName}
            onChange={event => setNewIngredientName(event.target.value)}
            fullWidth
          />
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

      <div className='delete-ingredients'>
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
        open={openDeleteIngredientDialog}
        onClose={handleCloseDeleteIngredientsDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirmer la suppression des ingrédients</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sûr de vouloir supprimer ces ingrédients définitivement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteIngredientsDialog} color='primary'>
            Annuler
          </Button>
          <Button onClick={confirmDeletion} color='primary' autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default IngredientList;