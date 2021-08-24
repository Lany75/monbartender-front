import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Axios from "axios";

import apiBaseURL from "../../env";

import LoadingMessage from '../loadingMessage/LoadingMessage';
import { AuthContext } from '../../context/authContext';

const UsersList = ({ users, setUsers }) => {
  const { user, accessToken } = React.useContext(AuthContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const setRight = modifyUser => {
    if (modifyUser.personneId !== 'mlanie.parry@gmail.com' && modifyUser.personneId !== user.email) {
      Axios.put(`${apiBaseURL}/api/v2/bars/${modifyUser.personneId}`, {
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          setUsers(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  }

  return (
    <>
      {users ? (
        <Paper className='users-board' >
          <TableContainer className='table-container'>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell className='table-cell-head' align='right'>MAIL</TableCell>
                  <TableCell className='table-cell-head' align='right'>ADMIN ?</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{row.id.split('-')[0]}</TableCell>
                      <TableCell align='right'>{row.personneId}</TableCell>
                      <TableCell align='right' onClick={() => setRight(row)}>{row.droits ? 'oui' : 'non'}</TableCell>
                      <TableCell align='right'>{!row.droits && <DeleteForeverIcon /*onClick={() => deleteGlass(row.id)}*/ />}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer >
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={users.length}
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

export default UsersList;