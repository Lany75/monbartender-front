import React from "react";

export default function EtapePreparation(props) {
  // eslint-disable-next-line react/prop-types
  const { cocktail, etape } = props;
  const numEtape = "etape" + etape;
  //console.log(numEtape);
  return (
    <div className="num-etape">
      <div className="titre-etape">Etape {etape} : </div>
      <div className="texte-etape">
        {// eslint-disable-next-line react/prop-types
        cocktail.EtapesPreparation && cocktail.EtapesPreparation.etape1}
      </div>
    </div>
  );
}
