import React from 'react';
//import Axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery } from '@material-ui/core';

//import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
//import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

//import apiBaseURL from "../../env";

//import LoadingMessage from '../loadingMessage/LoadingMessage';
import { IngredientContext } from '../../context/ingredientContext';
//import { AuthContext } from '../../context/authContext';

import './IngredientCategoryList.css';

const IngredientCategoryList = ({ message, setMessage }/*{ setCategoryClicked }*/) => {
  //const { accessToken } = React.useContext(AuthContext);
  const { listeCategoriesIngredients/*, setListeCategoriesIngredients*/ } = React.useContext(IngredientContext);
  const [pageSize, setPageSize] = React.useState(5);

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
        //onSelectionModelChange={selectRow}
        //onCellClick={handleClickOpenModifyGlassDialog}
        />
      </div>


      <div className='message'>{message}</div>


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