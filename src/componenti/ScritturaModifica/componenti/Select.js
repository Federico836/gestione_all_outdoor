import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {

  const {value,setValue,label,valuesList = []} = props
  

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select-id"
          value={value}
          label={label}
          onChange={handleChange}
        >
        {valuesList.map(vl => {      
            const {value,name} = vl
            return <MenuItem value={value}>{name}</MenuItem>
        })}
        </Select>
      </FormControl>
    </Box>
  );
}
