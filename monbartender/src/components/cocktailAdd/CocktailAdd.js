import React from 'react';
import { FormControlLabel, Radio, RadioGroup, TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';

import ImageCocktail from '../imageCocktail/ImageCocktail';
import { VerreContext } from '../../context/verreContext';
import './CocktailAdd.css';

const CocktailAdd = () => {
  const { listeVerres } = React.useContext(VerreContext);
  const [cocktailName, setcocktailName] = React.useState('');
  const [typeCocktail, setTypeCocktail] = React.useState("false");
  const [refChosenImage, setRefChosenImage] = React.useState('img_cocktail/noImageFound.jpg')
  const [chosenImage, setChosenImage] = React.useState(null);
  const [chosenGlass, setChosenGlass] = React.useState('');

  const handleChangeTypeCocktail = event => {
    setTypeCocktail(event.target.value);
  };

  const handleChangeImageCocktail = event => {
    if (event.target.files && event.target.files[0]) {
      setChosenImage(URL.createObjectURL(event.target.files[0]));
      setRefChosenImage('img_cocktail/' + event.target.files[0].name);
    }
  }
  const resetImage = () => {
    setRefChosenImage('img_cocktail/noImageFound.jpg');
    setChosenImage(null);
  }

  const handleChangeChosenGlass = (event) => {
    setChosenGlass(event.target.value);
  };

  const addCocktail = (event) => {
    event.preventDefault();
    console.log('nom : ', cocktailName);
    console.log('alcoolisé : ', typeCocktail);
    console.log('image : ', refChosenImage);
    console.log('verre : ', chosenGlass);
  }

  return (
    <div className='cocktail-add'>
      <div className='cocktail-add-title'>Ajout d'un cocktail</div>
      <form className='form-cocktail-add' onSubmit={addCocktail}>
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

        <div className='cocktail-add-img'>
          <p id='p-image'>Image :</p>
          {!chosenImage ? (
            <ImageCocktail classe='manage-cocktail-img' reference={refChosenImage} />
          ) : (
            <img src={chosenImage} alt='le cocktail' className='manage-cocktail-img' />
          )}
          <label htmlFor="contained-button-file" className='btn-choose-img'>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={handleChangeImageCocktail}
            />
            <Button variant="contained" color="primary" component="span">
              Modifier
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={resetImage}
            >
              Supprimer
            </Button>
          </label>
        </div>

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
