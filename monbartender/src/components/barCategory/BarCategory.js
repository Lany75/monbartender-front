import React from 'react';

import { BarContext } from '../../context/barContext';
import BarIngredient from '../barIngredient/BarIngredient';
import './BarCategory.css';

const BarCategory = ({ category }) => {
  const { bar } = React.useContext(BarContext);
  const [ingredientsOfCategory, setIngredientsOfCategory] = React.useState([]);

  const getIngredientsOfCategory = () => {
    const ingredients = [];
    bar && bar.Ingredients.forEach(bi => {
      if (bi.CategorieIngredient.nom === category.nom) {
        ingredients.push(bi)
      }
    })
    setIngredientsOfCategory(ingredients);
  }

  React.useEffect(() => {
    getIngredientsOfCategory();
  }, [category, bar]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {ingredientsOfCategory.length > 0 && (
        <div className='bar-category'>
          <p className='category-name'>{category.nom}</p>
          <div className='bar-ingredients'>
            {ingredientsOfCategory.map(ing => {
              return <BarIngredient ingredient={ing} key={ing.id} />
            }
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default BarCategory;