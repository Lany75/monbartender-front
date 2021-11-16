import React from "react";
import { Button } from "@material-ui/core";
import './CocktailPhoto.css';
import CocktailChosenImage from "../cocktailChosenImage/CocktailChosenImage";

const CocktailPhoto = ({ refChosenImage, setRefChosenImage, setPhoto }) => {
  const [chosenImage, setChosenImage] = React.useState(null);

  const handleChangeImageCocktail = event => {
    if (event.target.files && event.target.files[0]) {
      setChosenImage(URL.createObjectURL(event.target.files[0]));
      setPhoto(event.target.files[0]);
      setRefChosenImage('img_cocktail/' + event.target.files[0].name);
    }
  }
  const resetImage = () => {
    setRefChosenImage('img_cocktail/noImageFound.jpg');
    setChosenImage(null);
  }

  return (
    <div className='cocktail-photo'>
      <CocktailChosenImage chosenImage={chosenImage} refChosenImage={refChosenImage} />
      <label htmlFor="contained-button-file" className='btn-choose-img'>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={handleChangeImageCocktail}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          style={{ textAlign: 'center' }}
        >
          Modifier l'image
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={resetImage}
          id='delete-button'
        >
          Supprimer l'image
        </Button>
      </label>
    </div>
  )

}

export default CocktailPhoto;