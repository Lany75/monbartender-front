import React from "react";
import { FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import './CocktailAddNameType.css';

const CocktailAddNameType = () => {
  const [cocktailName, setcocktailName] = React.useState('');
  const [typeCocktail, setTypeCocktail] = React.useState("false");

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
        required
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

export default CocktailAddNameType;