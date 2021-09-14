import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { IngredientContext } from '../../context/ingredientContext';
import { /*Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,*/ useMediaQuery } from '@material-ui/core';

const UnityList = () => {
  const { unitiesList } = React.useContext(IngredientContext);
  const [pageSize, setPageSize] = React.useState(5);
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

  return (
    <>
      <h4>LES UNITES</h4>
      <div className='unities-list' style={{ height: 110 + pageSize * 52, width: desktop ? '66%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={unitiesList}
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
    </>
  )
}

export default UnityList;