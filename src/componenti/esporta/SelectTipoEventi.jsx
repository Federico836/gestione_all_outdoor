import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants(props) {

  const {tipoEventi,setTipoEventi} = props

  const handleChange = (e) => {
    setTipoEventi(e.target.value)
  }
  
  return (
    <div style={{marginBottom: '20px'}}>
      <FormControl variant="outlined" sx={{ m: 0, minWidth: 120 }} fullWidth size='small'>
        <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={tipoEventi}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value={'framework'}>FRAMEWORKS</MenuItem>
          <MenuItem value={'template'}>TEMPLATES</MenuItem>
          <MenuItem value={'fit'}>FIT</MenuItem>
          <MenuItem value={'workouts'}>WORKOUTS</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
