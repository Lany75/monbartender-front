import React from 'react';
import Axios from "axios";
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

import { refStorage } from "../../firebaseConfig";
import apiBaseURL from "../../env";

import './CocktailAdd.css';
import CocktailAddNameType from '../cocktailAddNameType/CocktailAddNameType';
import CocktailAddPhoto from '../cocktailAddPhoto/CocktailAddPhoto';
import CocktailAddGlass from '../cocktailAddGlass/CocktailAddGlass';
import CocktailAddIngredients from '../cocktailAddIngredients/CocktailAddIngredients';
import CocktailAddSteps from '../cocktailAddSteps/CocktailAddSteps';
import { CocktailContext } from '../../context/cocktailContext';

const CocktailAdd = () => {
  let history = useHistory();
  const { setListeCocktails } = React.useContext(CocktailContext);
  const [cocktailName, setcocktailName] = React.useState('');
  const [typeCocktail, setTypeCocktail] = React.useState("false");
  const [refChosenImage, setRefChosenImage] = React.useState('img_cocktail/noImageFound.jpg')
  const [photo, setPhoto] = React.useState(null);
  const [chosenGlass, setChosenGlass] = React.useState('');
  const [ingredients, setIngredients] = React.useState([])
  const [steps, setSteps] = React.useState([])

  const addCocktail = (event) => {
    event.preventDefault();

    if (photo) {
      // initialisation de la référence de l'image
      const imgRef = refStorage.child(refChosenImage);
      //envoi de la photo sur firebase storage
      const upload = imgRef.put(photo);

      // fonction spéciale qui attend que la photo soit postée sur firebase avant de faire la suite
      upload.on(
        "state_changed",
        function progress() { },
        function error() {
          console.log("error uploading file");
        },
        function complete() {
          console.log('photo envoyée sur firebase')
        }
      );
    }

    Axios.post(`${apiBaseURL}/api/v2/cocktails/`, {
      nomCocktail: cocktailName,
      type: typeCocktail,
      image: refChosenImage,
      nomVerre: chosenGlass,
      ingredients: ingredients,
      etapes: steps
    })
      .then(reponse => {
        setListeCocktails(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });

    history.push("/gestion");

  }

  return (
    <div className='cocktail-add'>
      <div className='cocktail-add-title'>Ajout d'un cocktail</div>
      <form className='form-cocktail-add' onSubmit={addCocktail}>
        <CocktailAddNameType
          cocktailName={cocktailName}
          setcocktailName={setcocktailName}
          typeCocktail={typeCocktail}
          setTypeCocktail={setTypeCocktail}
        />
        <CocktailAddPhoto
          refChosenImage={refChosenImage}
          setRefChosenImage={setRefChosenImage}
          setPhoto={setPhoto}
        />
        <CocktailAddGlass
          chosenGlass={chosenGlass}
          setChosenGlass={setChosenGlass}
        />
        <CocktailAddIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <CocktailAddSteps
          steps={steps}
          setSteps={setSteps}
        />
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
