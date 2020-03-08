import React, { createContext } from "react";

export const CocktailContext = createContext({
  cocktails: [{}],
  addCocktails: () => {
    console.log("fonction addCocktails");
  }
});

// eslint-disable-next-line react/prop-types
function CocktailProvider({ children, cocktails = null, addCocktails }) {
  return (
    <CocktailContext.Provider value={{ cocktails, addCocktails }}>
      {children}
    </CocktailContext.Provider>
  );
}

export default CocktailProvider;
