import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Controller} from 'react-hook-form'




export default function MyDatePicker(props) {
  
  const {label,name,width,control} = props
  return (


    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <Controller
          name={name}
          control ={control}
          render={({
              field:{onChange,value},

        })=>(
          <DatePicker label={label}  sx={{width:{width}}}
          required
          onChange={onChange}
          value={value} />
        )}
        
        />


    </LocalizationProvider>

    
        
  );
}
