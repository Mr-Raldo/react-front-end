import  {React, useEffect, useState}from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller,useWatch  } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MyDatePicker from './forms/MyDatePicker'
import MyTextField from './forms/MyTextField'
import MySelectfiled from './forms/MySelectfiled'
import MultilineTextField from './forms/MultilineTextField'
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import {useNavigate, useParams} from 'react-router-dom'

const Edit = () => {
  const MyParam = useParams();
  const MyId = MyParam.id;
  const { handleSubmit, setValue,control } = useForm();
  const [numberOfEmployees, setNumberOfEmployees] = useState(1); // Use the useState hook
  const navigate = useNavigate();
  const handleNumberOfEmployeesChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setNumberOfEmployees(count);
  };
  const [loading, setLoading] = useState(true); // Use the useState hook

  const GetData = () => {
    AxiosInstance.get(`company/${MyId}/`).then((res) => {
      console.log(res.data);
      setValue('company.name',res.data.name)
      setValue('company.registration_number',res.data.registration_number)
      setValue('company.address',res.data.address)
      setValue('company.list_of_departments',res.data.list_of_departments)
      setValue('company.contact_person',res.data.contact_person)
      setValue('company.contact_person_no',res.data.contact_phone)
      setValue('company.registration_date',Dayjs(res.data.registration_date))
      setValue('company.numberOfEmployees',res.data.numberOfEmployees)
      setLoading(false);
    });
  };
  

  useEffect(() => {
    console.log(MyId)
    GetData();
    
    
  }, )


   

  const onSubmit = (data) => {
   
  // Post request for company data
   
  const RegistrationDate = Dayjs(data.company.registration_date["$d"]).format("YYYY-MM-DD");
  AxiosInstance.put(`company/${MyId}/`, {
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Name"
                  placeholder="Provide Company Name"
                  width='{30%}'
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
                />

              
              )}
            />
             <Controller
                name="company.registration_date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <MyDatePicker
                  {...field}
                  
                  label="Date of Registration"
                  control={control}
                  width='{30%}'  // Adjust the width directly within the MyDatePicker component
                  />
                )}
              />

          
      <Controller
          name="numberOfEmployees"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <TextField
              {...field}
              label="Number of Employees"
              type="number"
              value={numberOfEmployees}
              onChange={(e) => handleNumberOfEmployeesChange(e)}
              width='{10%}'
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

export default Edit;
