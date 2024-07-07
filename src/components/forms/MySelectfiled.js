import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form'



export default function MySelectfiled(props) {
  
  const [age, setAge] = React.useState('');
  const {label,width,name,control} = props

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      
      <FormControl variant="filled" sx={{width:{width}}}>
      <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
              <Controller
            name={name}
            control ={control}
          render={({
            field:{onChange,value},
            fieldState:{error},
            formState,


          })=>(
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            required
            onChange={onChange}
            value={value}
          
          
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
                )
  
              }
                    
                    />
       
       
      </FormControl>
    </div>
  );
}
