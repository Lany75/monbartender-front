import React from 'react';
import { useHistory } from 'react-router';
import { DataGrid } from '@material-ui/data-grid';
import { Button, /*Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,*/ useMediaQuery } from '@material-ui/core';

import { CocktailContext } from '../../context/cocktailContext';
import ImageCocktail from '../imageCocktail/ImageCocktail';
import './ManageCocktails.css';

const ManageCocktails = () => {
  const { listeCocktails } = React.useContext(CocktailContext);
  let history = useHistory();
  const [pageSize, setPageSize] = React.useState(5);
  const desktop = useMediaQuery('(min-width:769px)');

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: desktop ? 240 : 100,
      hide: !desktop && true
    },
    {
      field: 'nom',
      headerName: 'Nom',
      width: desktop ? 240 : 170,
    },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 120,
      renderCell: params => (
        <ImageCocktail
          classe='manage-cocktail-image'
          reference={params.row.photo}
          nom={params.row.nom}
        />
      )
    }
  ];

  const addCocktail = () => {
    history.push('/gestion/nouveau-cocktail/');
  }

  return (
    <div className='manage-cocktails'>
      <h4>LES COCKTAILS</h4>
      <div className='manage-cocktails-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={listeCocktails}
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

      <div className='add-delete-cocktails'>
        <Button
          variant="contained"
          color="primary"
        //onClick={deleteCocktails}
        >
          Supprimer les cocktails
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={addCocktail}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default ManageCocktails;