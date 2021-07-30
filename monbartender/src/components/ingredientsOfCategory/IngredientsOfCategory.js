import React, { useEffect } from 'react';
import Axios from "axios";

import apiBaseURL from "../../env";
import FilterItem from '../filterItem/FilterItem';

const IngredientsOfCategory = ({ category, isOpenFilter }) => {
  const [ingredients, setIngredients] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);

  const getIngredientsCategory = categoryId => {
    Axios.get(`${apiBaseURL}/api/v2/ingredients/category/${categoryId}`)
      .then(reponse => {
        setIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }

  useEffect(() => {
    getIngredientsCategory(category.id);

    if (category.id === isOpenFilter) setIsOpen(true)
    else setIsOpen(false);
  }, [category, isOpenFilter])

  return (
    isOpen && (
      <div className='filter-item'>
        {ingredients && ingredients.map((item, index) => {
          return <FilterItem key={index} item={item} />
        })}
      </div>
    )
  )
}

export default IngredientsOfCategory;