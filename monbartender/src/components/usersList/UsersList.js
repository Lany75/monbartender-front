import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import LoadingMessage from '../loadingMessage/LoadingMessage';

const UsersList = ({ users }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(users);

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
                      <TableCell /*onClick={() => setGlassClicked(row)}*/>{row.id.split('-')[0]}</TableCell>
                      <TableCell align='right' /*onClick={() => setGlassClicked(row)}*/>{row.personneId}</TableCell>
                      <TableCell align='right' /*onClick={() => setGlassClicked(row)}*/>{row.droits ? 'oui' : 'non'}</TableCell>
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