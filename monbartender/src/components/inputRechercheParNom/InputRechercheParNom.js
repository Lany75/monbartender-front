import React from "react";

import "./InputRechercheParNom.css";

//import { CocktailContext } from "../../context/cocktailContext";
import { useHistory } from "react-router-dom";
//import ListeRecettesParNom from "../listeParNom/ListeParNom";

// eslint-disable-next-line no-undef
//const apiBaseURL = process.env.REACT_APP_BASE_API;

const InputRechercheParNom = () => {
  let history = useHistory();

  // const { cocktails, addCocktails } = useContext(CocktailContext);
  //const [cocktails, setCocktails] = useState([]);

  function RecupererCocktailParNom(e) {
    if (e.key === "Enter") {
      //const cocktailName = document.getElementById("nomCocktail").value;

      history.push("/rechercherparnom");
    }
  }

  return (
    <div className="inputNom">
      <input
        type="text"
        id="nomCocktail"
        name="nomCocktail"
        placeholder="nom du cocktail"
        //onKeyUp={() => getCocktailsByName()}
        onKeyPress={RecupererCocktailParNom}
      />
    </div>
  );
};

export default InputRechercheParNom;
