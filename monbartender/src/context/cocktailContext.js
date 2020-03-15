import React, { createContext, useState } from "react";

export const CocktailContext = createContext();

// eslint-disable-next-line react/prop-types
function CocktailProvider({ children }) {
  const [nomCocktailRecherche, setNomCocktailRecherche] = useState();

  return (
    <CocktailContext.Provider
      value={{ nomCocktailRecherche, setNomCocktailRecherche }}
    >
      {children}
    </CocktailContext.Provider>
  );
}

export default CocktailProvider;
