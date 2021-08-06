import React from 'react';
import Axios from "axios";
import { RadioGroup, FormControlLabel, Radio, Checkbox, Button } from "@material-ui/core";

import apiBaseURL from "../../env";

import { IngredientContext } from '../../context/ingredientContext';
import IngredientSearchFilter from '../IngredientSearchFilter/IngredientSearchFilter';
import IngredientsOfCategory from '../ingredientsOfCategory/IngredientsOfCategory';

import './IngredientSearchForm.css';
import { BarContext } from '../../context/barContext';

const IngredientSearchForm = ({ setSearchCocktails }) => {
  const { listeCategoriesIngredients } = React.useContext(IngredientContext);
  const { bar } = React.useContext(BarContext);
  const [valueRadioButton, setValueRadioButton] = React.useState("indifferent");
  const [useMyIngredient, setUseMyIngredient] = React.useState(false);
  const [isOpenFilter, setIsOpenFilter] = React.useState('');
  const [isClickedButton, setIsClickedButton] = React.useState('');
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);

  const handleChangeRadioButton = event => {
    setValueRadioButton(event.target.value);
  };

  const handleChangeMyIngredient = (event) => {
    setUseMyIngredient(event.target.checked);
    if (event.target.checked) {
      const myIngredients = [];
      bar.Ingredients.forEach(bi => {
        if (selectedIngredients.indexOf(bi.nom) !== -1) myIngredients.push(bi.nom);
      })
      setSelectedIngredients(myIngredients);
    }
  };

  const onSearch = (event) => {
    event.preventDefault();

    if (selectedIngredients.length === 0) setSearchCocktails([]);
    else {
      Axios.post(`${apiBaseURL}/api/v2/cocktails/search`, { ingredients: selectedIngredients, typeCocktail: valueRadioButton })
        .then(reponse => {
          setSearchCocktails(reponse.data)
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  }

  return (
    <form className='ingredient-search-form' onSubmit={onSearch}>
      <div className='type-myingr'>
        <RadioGroup
          id='radio-button'
          name='alcool'
          value={valueRadioButton}
          onChange={handleChangeRadioButton}
        >
          <FormControlLabel
            value='true'
            control={<Radio color='primary' />}
            label='Avec alcool'
          />
          <FormControlLabel
            value='false'
            control={<Radio color='primary' />}
            label='Sans alcool'
          />
          <FormControlLabel
            value='indifferent'
            control={<Radio color='primary' />}
            label='Indifférent'
          />
        </RadioGroup>
        {bar && (
          <FormControlLabel
            control={
              <Checkbox
                checked={useMyIngredient}
                onChange={handleChangeMyIngredient}
                name="useMyIngredient"
                color="primary"
              />
            }
            label="Utiliser mes ingrédients"
          />
        )}
      </div>
      <div className='filters'>
        <div className='title-remove'>
          <h3>Les filtres</h3>
          <p>Supprimer les filtres</p>
        </div>
        <div className='filters-list'>
          {listeCategoriesIngredients && listeCategoriesIngredients.map(lci => {
            return (
              <IngredientSearchFilter
                key={lci.id}
                categorie={lci}
                setIsOpenFilter={setIsOpenFilter}
                isClickedButton={isClickedButton}
                setIsClickedButton={setIsClickedButton}
              />
            )
          })}
        </div>
        <div className='filters-item'>
          {listeCategoriesIngredients && listeCategoriesIngredients.map(lci => {
            return (
              <IngredientsOfCategory
                category={lci}
                key={lci.id}
                isOpenFilter={isOpenFilter}
                useMyIngredient={useMyIngredient}
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
              />
            )
          })}
        </div>
      </div>
      <div className='ingredient-search-button'>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          J'ai soif !!
        </Button>
      </div>
    </form >
  )
}

export default IngredientSearchForm;