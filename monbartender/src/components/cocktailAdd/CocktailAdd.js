import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import './CocktailAdd.css';
import { VerreContext } from '../../context/verreContext';
import CocktailAddNameType from '../cocktailAddNameType/CocktailAddNameType';
import CocktailAddPhoto from '../cocktailAddPhoto/CocktailAddPhoto';

const CocktailAdd = () => {
  const { listeVerres } = React.useContext(VerreContext);
  const [chosenGlass, setChosenGlass] = React.useState('');

  const handleChangeChosenGlass = (event) => {
    setChosenGlass(event.target.value);
  };

  const addCocktail = (event) => {
    event.preventDefault();
    console.log('verre : ', chosenGlass);
  }

  return (
    <div className='cocktail-add'>
      <div className='cocktail-add-title'>Ajout d'un cocktail</div>
      <form className='form-cocktail-add' onSubmit={addCocktail}>
        <CocktailAddNameType />
        <CocktailAddPhoto />

        <FormControl variant='outlined' >
          <InputLabel id='label-glass'>Verre</InputLabel>
          <Select
            className='form-control-select'
            labelId='select-glass'
            id='select-glass'
            value={chosenGlass}
            onChange={handleChangeChosenGlass}
            label='Verre'
            style={{ width: 220 }}
            required
          >
            {listeVerres && listeVerres.map(glass => {
              return (
                <MenuItem value={glass.nom} key={glass.id}>{glass.nom}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <Button
          style={{ marginTop: 50 }}
          type='submit'
          variant='contained'
          color='primary'
        >
          Créer le cocktail
        </Button>
      </form>

    </div>
  )
}

export default CocktailAdd;
