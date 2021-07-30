import React from 'react';
import { FormControlLabel, Checkbox } from "@material-ui/core";

const FilterItem = ({ item }) => {
  const [ingredientChecked, setIngredientChecked] = React.useState(false);

  const handleChangeIngredientChecked = (event) => {
    setIngredientChecked(event.target.checked);
  };

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