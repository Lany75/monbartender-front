import React, { useEffect } from 'react';
import { Button } from "@material-ui/core";

import './IngredientSearchFilter.css';

const IngredientSearchFilter = ({ categorie, setIsOpenFilter, isClickedButton, setIsClickedButton }) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleChangeIsOpenFilter = event => {
    if (categorie.id === isClickedButton) {
      setIsOpenFilter('');
      setIsClickedButton('');
    } else {
      setIsOpenFilter(categorie.id);
      setIsClickedButton(categorie.id);
    }
  }

  useEffect(() => {
    if (categorie.id === isClickedButton) setIsClicked(true)
    else setIsClicked(false);
  }, [categorie, isClickedButton])

  return (
    <div className='filter-button'>
      {isClicked ? (
        <Button
          variant="outlined"
          onClick={handleChangeIsOpenFilter}
        >
          {categorie.nom}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleChangeIsOpenFilter}
          disableElevation
        >
          {categorie.nom}
        </Button>
      )}
    </div>
  )
}

export default IngredientSearchFilter;