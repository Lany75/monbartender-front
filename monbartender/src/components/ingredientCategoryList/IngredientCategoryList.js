import React from 'react';
import Axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery } from '@material-ui/core';

//import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
//import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import apiBaseURL from "../../env";

//import LoadingMessage from '../loadingMessage/LoadingMessage';
import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';

import './IngredientCategoryList.css';

const IngredientCategoryList = ({ message, setMessage }/*{ setCategoryClicked }*/) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeCategoriesIngredients, setListeCategoriesIngredients, getListeIngredients } = React.useContext(IngredientContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] = React.useState(false);
  const [openModifyCategoryDialog, setOpenModifyCategoryDialog] = React.useState(false);
  const [oldCategoryName, setOldCategoryName] = React.useState('');
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [modifiedCategoryId, setModifiedCategoryId] = React.useState('');

  //const [page, setPage] = React.useState(0);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const desktop = useMediaQuery('(min-width:769px)');

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: desktop ? 300 : 150,
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: desktop ? 300 : 150,
    }
  ];

  const handleClickOpenModifyCategoryDialog = (event) => {
    setMessage('');
    setModifiedCategoryId(event.row.id);
    setOldCategoryName(event.row.nom);
    setNewCategoryName(event.row.nom);
    setOpenModifyCategoryDialog(true);
  }
  const handleCloseModifyCategoryDialog = () => {
    setOpenModifyCategoryDialog(false);
  };
  const confirmModification = () => {
    if (newCategoryName !== oldCategoryName) {
      const name = newCategoryName.replace(/\s+/g, ' ').trim();

      if (
        !(/\S/.test(name) &&
          name.length >= 2 &&
          name.length <= 30)
      ) setMessage('Le nom doit avoir entre 2 et 30 caractères');
      else {
        if (
          listeCategoriesIngredients.findIndex(category => category.nom === name.toUpperCase()) !== -1
        ) setMessage('Cette catégorie existe déja');
        else {
          Axios.put(`${apiBaseURL}/api/v2/categories/${modifiedCategoryId}`,
            { nom: name },
            {
              headers: {
                authorization: accessToken
              }
            })
            .then(reponse => {
              setListeCategoriesIngredients(reponse.data);
              getListeIngredients();
            })
            .catch(error => {
              console.log("vous avez une erreur : ", error);
            });
        }
      }
    }

    handleCloseModifyCategoryDialog();
  }

  /*const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };*/

  /*const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };*/

  /*const deleteCategory = (categoryId) => {
    Axios.delete(`${apiBaseURL}/api/v2/categories/${categoryId}`,
      {
        headers: {
          authorization: accessToken
        }
      })
      .then(reponse => {
        setListeCategoriesIngredients(reponse.data);
        setCategoryClicked(null);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }*/

  const selectRow = (event) => {
    setSelectedRow(event);
    setMessage('');
  }
  const handleCloseDeleteCategoryDialog = () => {
    setOpenDeleteCategoryDialog(false);
  };
  const handleClickOpenDeleteCategoryDialog = () => {
    setOpenDeleteCategoryDialog(true);
  };
  const deleteCategory = () => {
    if (selectedRow.length > 0) handleClickOpenDeleteCategoryDialog();
    else setMessage('Aucun ingrédient sélectionné')
  }
  const confirmDeletion = () => {
    Axios.delete(`${apiBaseURL}/api/v2/categories/`,
      {
        headers: {
          authorization: accessToken
        },
        data: { deletedCategories: selectedRow }
      })
      .then(reponse => {
        setListeCategoriesIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    handleCloseDeleteCategoryDialog();
  }

  return (
    <>
      <h4>LES CATEGORIES D'INGREDIENTS</h4>
      <div className='categories-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={listeCategoriesIngredients}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectRow}
          onCellClick={handleClickOpenModifyCategoryDialog}
        />
      </div>

      <Dialog
        open={openModifyCategoryDialog}
        onClose={handleCloseModifyCategoryDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier la catégorie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Corrigez le nom de la catégorie
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la catégorie"
            value={newCategoryName}
            onChange={event => setNewCategoryName(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModifyCategoryDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmModification} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      <div className='delete-category'>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteCategory}
        >
          Supprimer les catégories
        </Button>
        <div className='message'>{message}</div>
      </div>

      <Dialog
        open={openDeleteCategoryDialog}
        onClose={handleCloseDeleteCategoryDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirmer la suppression des catégories</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sûr de vouloir supprimer ces catégories définitivement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteCategoryDialog} color='primary'>
            Annuler
          </Button>
          <Button onClick={confirmDeletion} color='primary' autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/*listeCategoriesIngredients ? (
        <Paper className='category-board'>
          <TableContainer className='table-container'>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell className='table-cell-head' align='right'>NOM</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listeCategoriesIngredients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell onClick={() => setCategoryClicked(row)}>{row.id.split('-')[0]}</TableCell>
                      <TableCell align='right' onClick={() => setCategoryClicked(row)}>{row.nom}</TableCell>
                      <TableCell align='right'><DeleteForeverIcon onClick={() => deleteCategory(row.id)} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer >
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={listeCategoriesIngredients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper >
      ) : (
        <LoadingMessage message='Chargement ...' />
      )*/}
    </>
  );
}

export default IngredientCategoryList;