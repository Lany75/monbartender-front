import React from "react";
import { Button } from '@material-ui/core';
import './CocktailAddPhoto.css';
import CocktailAddChosenImage from "../cocktailAddChosenImage/CocktailAddChosenImage";

const CocktailAddPhoto = () => {
  const [refChosenImage, setRefChosenImage] = React.useState('img_cocktail/noImageFound.jpg')
  const [chosenImage, setChosenImage] = React.useState(null);

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

  return (
    <div className='cocktail-add-img'>
      <CocktailAddChosenImage chosenImage={chosenImage} refChosenImage={refChosenImage} />
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
  )
}

export default CocktailAddPhoto;