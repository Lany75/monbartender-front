import React from 'react';

import { IngredientContext } from '../../context/ingredientContext';
import LoadingMessage from '../loadingMessage/LoadingMessage';
import BarCategory from '../barCategory/BarCategory';

import './UserBarIngredientList.css'

const UserBarIngredientList = () => {
  const { listeCategoriesIngredients } = React.useContext(IngredientContext);

  return (
    <>
      {listeCategoriesIngredients ? (
        <div className='ingredients-list'>
          <div className='ingredients-list-title'>Mon Bar</div>
          {listeCategoriesIngredients.map(lci => {
            return <BarCategory category={lci} key={lci.id} />
          })}
        </div>
      ) : (
        <LoadingMessage message='Chargement ...' />
      )}
    </>
  )
}

export default UserBarIngredientList;