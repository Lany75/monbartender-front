import React from "react";

import CocktailCard from '../cocktailCard/CocktailCard';
import LoadingMessage from '../loadingMessage/LoadingMessage';
import { CocktailContext } from "../../context/cocktailContext";

import "./MomentCocktails.css";

const MomentCocktails = () => {
  const { listeCocktailsMoment } = React.useContext(CocktailContext);

  return (
    listeCocktailsMoment ? (
      <div className='moment-cocktails'>
        <div className="moment-cocktails-title">Cocktails du moment</div>
        <div className="moment-cocktails-list">
          {listeCocktailsMoment.map(cocktail => {
            return (<CocktailCard cocktail={cocktail} key={cocktail.id} />);
          })}
        </div>
      </div>
    ) : (
      <LoadingMessage message='Chargement ...' />
    )
  );
};

export default MomentCocktails;
