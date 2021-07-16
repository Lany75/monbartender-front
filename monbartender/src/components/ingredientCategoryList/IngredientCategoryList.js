import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';

import LoadingMessage from '../loadingMessage/LoadingMessage';
import { IngredientContext } from '../../context/ingredientContext';

import './IngredientCategoryList.css';

const IngredientCategoryList = () => {
  const { listeCategoriesIngredients } = React.useContext(IngredientContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                </TableRow>
              </TableHead>
              <TableBody>
                {listeCategoriesIngredients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{row.id.split('-')[0]}</TableCell>
                      <TableCell align='right'>{row.nom}</TableCell>
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