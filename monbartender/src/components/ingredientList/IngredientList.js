import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';

import LoadingMessage from '../loadingMessage/LoadingMessage';
import DisplayError from '../displayError/DisplayError';

import { IngredientContext } from '../../context/ingredientContext';

import './IngredientList.css';

const IngredientList = ({ setIngredientClicked }) => {
  const { listeIngredients } = React.useContext(IngredientContext);
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
      {setIngredientClicked ? (
        listeIngredients ? (
          <Paper className='paper'>
            <TableContainer className='table-container'>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell className='table-cell-head' align='right'>NOM</TableCell>
                    <TableCell className='table-cell-head' align='right'>CATEGORIE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listeIngredients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => setIngredientClicked(row)}>
                        <TableCell>{row.id.split('-')[0]}</TableCell>
                        <TableCell align='right'>{row.nom}</TableCell>
                        <TableCell align='right'>{row.CategorieIngredient.nom}</TableCell>
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
        )
      ) : (
        <DisplayError classe='paper' componentName='IngredientList' />
      )}
    </>

  );
}

export default IngredientList;