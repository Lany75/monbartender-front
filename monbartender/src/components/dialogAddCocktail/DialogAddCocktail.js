import React from "react";
import Axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import CocktailNameType from "../cocktailNameType/CocktailNameType";
import CocktailPhoto from "../cocktailPhoto/CocktailPhoto";
import CocktailGlass from "../cocktailGlass/CocktailGlass";
import CocktailIngredients from "../cocktailIngredients/CocktailIngredients";
import CocktailSteps from "../cocktailSteps/CocktailSteps";
import { CocktailContext } from "../../context/cocktailContext";
import { AuthContext } from "../../context/authContext";

import { refStorage } from "../../firebaseConfig";
import apiBaseURL from "../../env";
import camelCaseText from '../../utils/cameCaseText';
import DialogErrorMessage from "../dialogErrorMessage/DialogErrorMessage";

const DialogAddCocktail = ({ openAddCocktailDialog, setOpenAddCocktailDialog }) => {
  const { listeCocktails, setListeCocktails } = React.useContext(CocktailContext);
  const { accessToken } = React.useContext(AuthContext);
  const [cocktailName, setcocktailName] = React.useState('');
  const [typeCocktail, setTypeCocktail] = React.useState("false");
  const [refChosenImage, setRefChosenImage] = React.useState('img_cocktail/noImageFound.jpg')
  const [photo, setPhoto] = React.useState(null);
  const [chosenGlass, setChosenGlass] = React.useState('');
  const [ingredients, setIngredients] = React.useState([]);
  const [steps, setSteps] = React.useState([]);
  const [openErrorMessageDialog, setOpenErrorMessageDialog] = React.useState(false);

  const handleCloseAddCocktailDialog = () => {
    setRefChosenImage('img_cocktail/noImageFound.jpg');
    setPhoto(null);
    setOpenAddCocktailDialog(false);
  }

  const cancelAdding = () => {
    setcocktailName('');
    setTypeCocktail('false');
    setChosenGlass('');
    setIngredients([]);
    setSteps([]);
    handleCloseAddCocktailDialog();
  }

  const confirmAdding = () => {
    console.log({
      nomCocktail: cocktailName,
      type: typeCocktail,
      image: refChosenImage,
      nomVerre: chosenGlass,
      ingredients: ingredients,
      etapes: steps
    });

    const name = cocktailName.replace(/\s+/g, ' ').trim();

    if (
      !/\S/.test(name) ||
      name.length < 2 ||
      name.length > 50 ||
      listeCocktails.findIndex(cock => cock.nom === camelCaseText(name)) !== -1 ||
      refChosenImage.length > 150 ||
      !/\S/.test(refChosenImage) ||
      chosenGlass === '' ||
      ingredients.length === 0 ||
      steps.length === 0
    ) {
      setOpenErrorMessageDialog(true);
    }
    else {
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

      Axios.post(`${apiBaseURL}/api/v2/cocktails/`,
        {
          nomCocktail: camelCaseText(name),
          type: typeCocktail,
          image: refChosenImage,
          nomVerre: chosenGlass,
          ingredients: ingredients,
          etapes: steps
        },
        {
          headers: {
            authorization: accessToken
          }
        })
        .then(reponse => {
          setListeCocktails(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });

      setcocktailName('');
      setTypeCocktail('false');
      setChosenGlass('');
      setIngredients([]);
      setSteps([]);
      handleCloseAddCocktailDialog();
    }
  }

  return (
    <>
      <Dialog
        open={openAddCocktailDialog}
        onClose={handleCloseAddCocktailDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Ajout d'un nouveau cocktail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selectionnez les données du cocktail
          </DialogContentText>
          <CocktailNameType
            cocktailName={cocktailName}
            setcocktailName={setcocktailName}
            typeCocktail={typeCocktail}
            setTypeCocktail={setTypeCocktail}
          />
          <CocktailPhoto
            refChosenImage={refChosenImage}
            setRefChosenImage={setRefChosenImage}
            setPhoto={setPhoto}
          />
          <CocktailGlass
            chosenGlass={chosenGlass}
            setChosenGlass={setChosenGlass}
          />
          <CocktailIngredients
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <CocktailSteps
            steps={steps}
            setSteps={setSteps}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelAdding} color='primary'>
            Annuler
          </Button>
          <Button onClick={confirmAdding} color='primary' autoFocus>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog >

      <DialogErrorMessage
        openErrorMessageDialog={openErrorMessageDialog}
        setOpenErrorMessageDialog={setOpenErrorMessageDialog}
        errorMessage={'Des données sont erronées ou manquantes pour l\'ajout du cocktail'}
      />
    </>
  )
}

export default DialogAddCocktail;