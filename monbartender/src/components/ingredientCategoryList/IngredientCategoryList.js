import React from 'react';
import Axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import apiBaseURL from "../../env";

import LoadingMessage from '../loadingMessage/LoadingMessage';
import { IngredientContext } from '../../context/ingredientContext';

import './IngredientCategoryList.css';

const IngredientCategoryList = ({ setCategoryClicked }) => {
  const { listeCategoriesIngredients, setListeCategoriesIngredients } = React.useContext(IngredientContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteCategory = (categoryId) => {
    Axios.delete(`${apiBaseURL}/api/v2/ingredients/category/${categoryId}`)
      .then(reponse => {
        setListeCategoriesIngredients(reponse.data);
        setCategoryClicked(null);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

  }

  return (
    <>
      {listeCategoriesIngredients ? (
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
      )}
    </>
  );
}

export default IngredientCategoryList;