import React from 'react';
import Axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import apiBaseURL from "../../env";

import { AuthContext } from '../../context/authContext';
import { VerreContext } from '../../context/verreContext';
import LoadingMessage from '../loadingMessage/LoadingMessage';

import './GlassList.css';

const GlassList = ({ setGlassClicked }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeVerres, setListeVerres } = React.useContext(VerreContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteGlass = glassId => {
    Axios.delete(`${apiBaseURL}/api/v2/glasses/${glassId}`,
      {
        headers: {
          authorization: accessToken
        }
      })
      .then(reponse => {
        setListeVerres(reponse.data);
        setGlassClicked(null);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }

  return (
    <>
      {listeVerres ? (
        <Paper className='glass-board'>
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
                {listeVerres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell onClick={() => setGlassClicked(row)}>{row.id.split('-')[0]}</TableCell>
                      <TableCell align='right' onClick={() => setGlassClicked(row)}>{row.nom}</TableCell>
                      <TableCell align='right'><DeleteForeverIcon onClick={() => deleteGlass(row.id)} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer >
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={listeVerres.length}
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
  )
}

export default GlassList;