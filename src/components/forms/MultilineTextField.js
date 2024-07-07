import * as React from 'react';

import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'

export default function MultilineTextField(props) {
  const {label,width,placeholder,name,control} = props
  return (
   <Controller
    name={name}
    control ={control}
   render={({
    field:{onChange,value},
    fieldState:{error},
    formState,


   })=>(
    <TextField
    sx={{width:{width}}}
    required
    onChange={onChange}
    value={value}
    id="outlined-multiline-flexible"
    // label="Multiline"
    label={label}
    multiline
    maxRows={3}
    variant="standard"
    placeholder={placeholder}
  />
   )
  
  }
        
        />
  );
}

