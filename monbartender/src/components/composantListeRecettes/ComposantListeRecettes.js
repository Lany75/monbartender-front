import React from "react";

import ImageCocktail from "../imageCocktail/ImageCocktail";

import "./ComposantListeRecettes.css";
import "./ComposantListeRecettesDesktop.css";

const ComposantListeRecettes = props => {
  // eslint-disable-next-line react/prop-types
  const { nom, photo } = props;

  return (
    <div className="cocktail">
      <ImageCocktail classe="img-cocktail" reference={photo} nom={nom} />
      <div className="nom-cocktail">{nom}</div>
    </div>
  );
};

export default ComposantListeRecettes;
