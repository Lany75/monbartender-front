import React from 'react';
import { FormControlLabel, Checkbox } from "@material-ui/core";

const FilterItem = ({ item, selectedIngredients, setSelectedIngredients }) => {
  const [ingredientChecked, setIngredientChecked] = React.useState(false);

  const handleChangeIngredientChecked = (event) => {
    const selectedIngredientsCopy = selectedIngredients.slice();
    setIngredientChecked(event.target.checked);
    if (event.target.checked) {
      selectedIngredientsCopy.push(item.nom);
      setSelectedIngredients(selectedIngredientsCopy);
    } else {
      const indexItem = selectedIngredientsCopy.indexOf(item.nom);
      selectedIngredientsCopy.splice(indexItem, 1);
      setSelectedIngredients(selectedIngredientsCopy);
    }
  };

  React.useEffect(() => {
    if (selectedIngredients.indexOf(item.nom) !== -1) setIngredientChecked(true);
    else setIngredientChecked(false);
  }, [item.nom, selectedIngredients])

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={ingredientChecked}
          onChange={handleChangeIngredientChecked}
          name="ingredientChecked"
          color="primary"
        />
      }
      label={item.nom}
    />
  )
}

export default FilterItem;