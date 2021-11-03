import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { VerreContext } from "../../context/verreContext";

const CocktailAddGlass = ({ chosenGlass, setChosenGlass }) => {
  const { listeVerres } = React.useContext(VerreContext);

  const handleChangeChosenGlass = (event) => {
    setChosenGlass(event.target.value);
  };

  return (
    <FormControl variant='outlined' >
      <InputLabel id='label-glass'>Verre</InputLabel>
      <Select
        className='form-control-select'
        labelId='select-glass'
        id='select-glass'
        value={chosenGlass}
        onChange={handleChangeChosenGlass}
        label='Verre'
        style={{ width: 220 }}
        required
      >
        {listeVerres && listeVerres.map(glass => {
          return (
            <MenuItem value={glass.nom} key={glass.id}>{glass.nom}</MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default CocktailAddGlass;