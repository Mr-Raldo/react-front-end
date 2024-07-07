import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller,useWatch  } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MyDatePicker from './forms/MyDatePicker'
import MyTextField from './forms/MyTextField'
import MySelectfiled from './forms/MySelectfiled'
import MultilineTextField from './forms/MultilineTextField'
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";





const Company = () => {
 

  



  const { handleSubmit, control } = useForm();
  const [numberOfEmployees, setNumberOfEmployees] = React.useState(1);
  const navigate = useNavigate()
  const handleNumberOfEmployeesChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setNumberOfEmployees(count);
  

  };

  

  const onSubmit = (data) => {
    
  
    // Post request for company data
   
  // Post request for company data
   
  const RegistrationDate = Dayjs(data.company.registration_date["$d"]).format("YYYY-MM-DD");
  AxiosInstance.post(`company/`, {
    name: data.company.name,
    registration_number: data.company.registration_number,
    address: data.company.address,
    registration_date: RegistrationDate,
    contact_person: data.company.contact_person,
    contact_phone: data.company.contact_person_no,
    number_of_employees:numberOfEmployees,
    list_of_departments: data.company.list_of_departments,
  })
    .then((companyResponse) => {
      console.log('Company Data:', data.company);
      console.log('Company successfully saved:', companyResponse);
      navigate(`/`)

  })
    .catch((companyError) => {
      console.error('Error saving Company data:', companyError);
    });

  console.log('Form Data:', data);
};
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '5px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff', padding: '20px' }}>
            Add a Company
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', boxShadow: 4, marginBottom: '20px', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', marginLeft: '30px', marginTop: '25px', marginBottom: '20px', justifyContent: 'space-around' }}>
            <Controller
              name="company.name"
              control={control}
              defaultValue=""
              
              render={({ field}) => (
                
                <TextField
                  {...field}
                
                  label="Company Name"
                  placeholder="Provide Company Name"
                  width='{30%}'
                  required
                />

              
              )}
            />
              <Controller
              name="company.registration_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Reg No"
                  placeholder="Provide Company Reg No"
                  width='{30%}'
                  required
                />

              
              )}
            />
            <Controller
              name="company.address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Address"
                  placeholder="Provide Company Address"
                  width='{30%}'
                  required
                />

              
              )}
            />
        
          </Box>
          
          <Box sx={{ display: 'flex',marginBottom: '20px', justifyContent:'space-around'}}>
          <Controller
              name="company.list_of_departments"
              control={control}
              render={({ field }) => (
                
                <TextField
                {...field}
                  label="Company List of departments"
                  multiline
                  rows={4}
                  placeholder="Provide List of departments"
                  width='{30%}'
                  required
                />

              
              )
            }
            />
             <Controller
              name="company.contact_person"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Contact Person"
                  placeholder="Provide Contact Person"
                  width='{30%}'
                  required
                />

              
              )}
            />
          
        
             
           </Box>
            
          <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '25px', justifyContent: 'space-around' }}>
          
          
          
          
          <Controller
              name="company.contact_person_no"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Contact Person Number"
                  placeholder="Provide Contact Person Number"
                  width='{30%}'
                  required
                />

              
              )}
            />
           <Controller
              name="company.registration_date"
              control={control}
              defaultValue={null}
              rules={{ required: "Date of Registration is required" }}  // Add the required rule here
              render={({ field, fieldState: { error } }) => (
                <div>
                  <MyDatePicker
                    {...field}
                    label="Date of Registration"
                    control={control}
                    width='{30%}'  // Adjust the width directly within the MyDatePicker component
                  />
                  {error && (
                    <p style={{ color: 'red' }}>{error.message}</p>
                  )}
                </div>
              )}
            />




          
      <Controller
          name="numberOfEmployees"
          control={control}
          defaultValue={1}
          render={({ field}) => (
            <TextField
              {...field}
              label="Number of Employees"
              type="number"
              value={numberOfEmployees}
              onChange={(e) => handleNumberOfEmployeesChange(e)}
              width='{10%}'
              required
            />
          )}
        />
      
          </Box>
        </Box>
 


        <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '20px', width: '100%', justifyContent: 'flex-end' }}>
          <Box sx={{ width: '30%' }}>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Company;
