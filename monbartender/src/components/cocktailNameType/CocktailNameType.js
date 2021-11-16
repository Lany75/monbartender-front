import React from "react";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import './CocktailNameType.css';

const CocktailNameType = ({ cocktailName, setcocktailName, typeCocktail, setTypeCocktail }) => {

  const handleChangeTypeCocktail = event => {
    setTypeCocktail(event.target.value);
  };

  return (
    <div className='cocktail-name-type'>
      <TextField
        variant='outlined'
        margin='normal'
        label='Nom du cocktail'
        name='cocktailName'
        value={cocktailName}
        onChange={event => setcocktailName(event.target.value)}
        style={{ width: 220 }}
      />
      <RadioGroup
        id='type-cocktail'
        name='alcool'
        value={typeCocktail}
        onChange={handleChangeTypeCocktail}
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
      </RadioGroup>
    </div>
  )
}

export default CocktailNameType;