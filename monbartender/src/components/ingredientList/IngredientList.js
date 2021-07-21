import React from 'react';
import Axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import apiBaseURL from "../../env";

import LoadingMessage from '../loadingMessage/LoadingMessage';
import DisplayError from '../displayError/DisplayError';

import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';
import { BarContext } from '../../context/barContext';

import './IngredientList.css';

const IngredientList = ({ setIngredientClicked }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeIngredients, setListeIngredients } = React.useContext(IngredientContext);
  const { getBarUser } = React.useContext(BarContext);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteIngredient = ingredientId => {
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
  }

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
        )
      ) : (
        <DisplayError classe='paper' componentName='IngredientList' />
      )}
    </>

  );
}

export default IngredientList;