import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [cant, setCant] = React.useState('');

  const handleChange = (event) => {
    setCant(event.target.value);
  };

  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label" >Cantidad (gr)</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={cant}
          label="Cantidad (gr)"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>100 gr</MenuItem>
          <MenuItem value={20}>200 gr</MenuItem>
          <MenuItem value={30}>300 gr</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
