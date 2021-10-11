import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import './CocktailAdd.css';
import { VerreContext } from '../../context/verreContext';
import ImageCocktail from '../imageCocktail/ImageCocktail';
import CocktailAddNameType from '../cocktailAddNameType/CocktailAddNameType';

const CocktailAdd = () => {
  const { listeVerres } = React.useContext(VerreContext);
  const [refChosenImage, setRefChosenImage] = React.useState('img_cocktail/noImageFound.jpg')
  const [chosenImage, setChosenImage] = React.useState(null);
  const [chosenGlass, setChosenGlass] = React.useState('');

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
    console.log('image : ', refChosenImage);
    console.log('verre : ', chosenGlass);
  }

  return (
    <div className='cocktail-add'>
      <div className='cocktail-add-title'>Ajout d'un cocktail</div>
      <form className='form-cocktail-add' onSubmit={addCocktail}>
        <CocktailAddNameType />

        <div className='cocktail-add-img'>
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
