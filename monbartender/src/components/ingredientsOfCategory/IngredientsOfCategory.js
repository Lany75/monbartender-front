import React, { useEffect } from 'react';

import FilterItem from '../filterItem/FilterItem';
import { BarContext } from '../../context/barContext';
import { IngredientContext } from '../../context/ingredientContext';

const IngredientsOfCategory = ({ category, isOpenFilter, useMyIngredient, selectedIngredients, setSelectedIngredients }) => {
  const { listeIngredients } = React.useContext(IngredientContext);
  const { bar } = React.useContext(BarContext);
  const [ingredients, setIngredients] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);

  const getIngredientsCategory = () => {
    const ingOfCat = [];
    if (useMyIngredient) {
      bar && bar.Ingredients.forEach(bi => {
        if (bi.CategorieIngredient.nom === category.nom) {
          ingOfCat.push(bi)
        }
      })
    } else {
      listeIngredients && listeIngredients.forEach(li => {
        if (li.CategorieIngredient.nom === category.nom) {
          ingOfCat.push(li)
        }
      })
    }
    setIngredients(ingOfCat);
  }

  useEffect(() => {
    getIngredientsCategory();

    if (category.id === isOpenFilter) setIsOpen(true)
    else setIsOpen(false);
  }, [category, isOpenFilter, listeIngredients, bar, useMyIngredient]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    isOpen && (
      <div className='filter-item'>
        {ingredients && ingredients.map(item => {
          return (
            <FilterItem
              key={item.id}
              item={item}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
            />
          )
        })}
      </div>
    )
  )
}

export default IngredientsOfCategory;