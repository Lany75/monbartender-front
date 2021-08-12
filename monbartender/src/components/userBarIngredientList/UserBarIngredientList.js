import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { BarContext } from '../../context/barContext';
import './UserBarIngredientList.css'

const UserBarIngredientList = () => {
  const { bar } = React.useContext(BarContext);
  const [ingredients, setIngredients] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(5);
  const desktop = useMediaQuery('(min-width:769px)');

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: desktop ? 150 : 70,
      sortable: false,
    },
    {
      field: 'ingredientName',
      headerName: 'Ingrédient',
      width: desktop ? 300 : 150,
    },
    {
      field: 'categoryName',
      headerName: 'Catégorie',
      width: desktop ? 300 : 150,
    }
  ];

  React.useEffect(() => {
    const rows = [];
    bar && bar.Ingredients.forEach(ingredient => {
      rows.push({ id: ingredient.id, ingredientName: ingredient.nom, categoryName: ingredient.CategorieIngredient.nom })
    })
    setIngredients(rows);
  }, [bar])

  return (
    <>
      <div className='ingredients-list-title'>Mon Bar</div>
      <div className='ingredients-list' style={{ height: 110 + pageSize * 52, width: desktop ? '85%' : '100%', alignSelf: 'center' }}>
        <DataGrid
          rows={ingredients}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  )
}

export default UserBarIngredientList;