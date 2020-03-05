import React, {createContext} from 'react';

export const CocktailContext = createContext();

// eslint-disable-next-line react/prop-types
function CocktailProvider({children, cocktails=null}) {

  return (
    <CocktailContext.Provider value={{cocktails}}>
      {children}
    </CocktailContext.Provider>
  )
}

export default CocktailProvider;