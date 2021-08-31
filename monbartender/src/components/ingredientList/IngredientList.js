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
//import { BarContext } from '../../context/barContext';

import './IngredientList.css';

const IngredientList = (/*{ setIngredientClicked }*/{ message, setMessage }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeIngredients, setListeIngredients } = React.useContext(IngredientContext);
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [openDeleteIngredientDialog, setOpenDeleteIngredientDialog] = React.useState(false);

  //const { getBarUser } = React.useContext(BarContext);

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
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    handleCloseDeleteIngredientsDialog();
  }
  /*const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };*/

  /*const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };*/

  /*const deleteIngredient = ingredientId => {
    Axios.delete(`${apiBaseURL}/api/v2/ingredients/${ingredientId}`,
      {
        headers: {
          authorization: accessToken
        }
      })
      .then(reponse => {
        setListeIngredients(reponse.data);
        getBarUser();
        setIngredientClicked(null);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }*/

  return (
    <>
      <h4>LES INGREDIENTS</h4>
      <div className='igredients-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={listeIngredients}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectRow}
        //onCellClick={handleClickOpenModifyGlassDialog}
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



      {/*listeIngredients ? (
        <Paper className='paper'>
          <TableContainer className='table-container'>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell className='table-cell-head' align='right'>NOM</TableCell>
                  <TableCell className='table-cell-head' align='right'>CATEGORIE</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {listeIngredients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell onClick={() => setIngredientClicked(row)}>{row.id.split('-')[0]}</TableCell>
                      <TableCell align='right' onClick={() => setIngredientClicked(row)}>{row.nom}</TableCell>
                      <TableCell align='right' onClick={() => setIngredientClicked(row)}>{row.CategorieIngredient.nom}</TableCell>
                      <TableCell align='right'><DeleteForeverIcon onClick={() => deleteIngredient(row.id)} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer >
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={listeIngredients.length}
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

export default IngredientList;