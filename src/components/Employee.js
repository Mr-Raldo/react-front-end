import React , { useState, useEffect }from 'react';
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
import { FormControl } from '@mui/base/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const Employee = () => {
  const { handleSubmit, control } = useForm();
  
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([]); // State to hold the list of companies
  const [selectedCompany, setSelectedCompany] = useState(''); // State to hold the selected company



   // Function to fetch companies from the backend
  const fetchCompanies = () => {
    AxiosInstance.get('company/') // Replace '/companies/' with the actual endpoint URL
      .then(response => {
        setCompanies(response.data); // Update the list of companies in the state
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
      });
  };

 // Use useEffect to fetch companies on component mount and set up periodic polling
 useEffect(() => {
  fetchCompanies(); // Fetch companies on component mount

  // Set up periodic polling to refresh the company dropdown options
  const interval = setInterval(() => {
    fetchCompanies(); // Fetch companies periodically
  }, 60000); // Adjust the interval as needed (e.g., every 1 minute)

  return () => clearInterval(interval); // Clean up the interval on component unmount
}, 
[]); // Empty dependency array ensures the effect runs only once

  // Function to handle company selection
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value); // Update the selected company in the state
  };

  const onSubmit = (data) => {
    
  
    // Post request for company data
    const DateStart = Dayjs(data.employee.date_started["$d"]).format("YYYY-MM-DD");   
const DateLeft = Dayjs(data.employee.date_left["$d"]).format("YYYY-MM-DD");
  AxiosInstance.post(`employee/`, {
    name: data.employee.name,
    employee_id: data.employee.employee_id,
    contact_phone: data.employee.contact_phone,
    email: data.employee.email,
    company: data.employee.company,
    department: data.employee.department,
    duties: data.employee.duties,
    role: data.employee.employee_id,
    date_started: DateStart,
    date_left: DateLeft,
    
  })
    .then((employeeResponse) => {
      console.log('Employee:', data.employee);
      console.log('Employee successfully saved:', employeeResponse);
      navigate(`/`)

  })
    .catch((employeeError) => {
      console.error('Error saving employee data:', employeeError);
    });

  console.log('Form Data:', data);
};


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '5px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff', padding: '20px' }}>
            Add Employee
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', boxShadow: 4, marginBottom: '20px', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', marginLeft: '30px', marginTop: '25px', marginBottom: '20px', justifyContent: 'space-around' }}>
            <Controller
              name="employee.name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Add Name"
                  placeholder="Provide Employee Name"
                  width='{30%}'
                  required
                />

              
              )}
            />
           
       
   
        
           <Controller
              name="employee.company"
              control={control}
              width='{30%}'
              rules={{ required: "Company Name is required" }}  // Add the required rule here
              placeholder="Select Company Name"
              render={({ field, fieldState: { error } }) => (
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="company-label">Select Company</InputLabel>
                    <Select
                      labelId="company-label"
                      id="company"
                      {...field}
                      value={selectedCompany}
                      error={!!error}
                      onChange={(e) => {
                        field.onChange(e);
                        setSelectedCompany(e.target.value);
                      }}
                      required
                      label="Select Company"
                      style={{ borderRadius: 8, backgroundColor: '#f5f5f5' }}  // Example of modern styling
                    >
                      <MenuItem value="">
                        <em>Select Company</em>
                      </MenuItem>
                      {/* Dynamically populate options based on the retrieved list of companies */}
                      {companies.map(company => (
                        <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
              )}
            />

        
       
              <Controller
              name="employee.employee_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Employee id"
                  placeholder="Provide Employee id No"
                  width='{30%}'
                  required
                />

              
              )}
            />
            <Controller
              name="employee.contact_phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Phone"
                  placeholder="Provide Company Address"
                  width='{30%}'
                  required
                />

              
              )}
            />
        
          </Box>
          
          <Box sx={{ display: 'flex',marginBottom: '20px', justifyContent:'space-around'}}>
          <Controller
              name="employee.email"
              control={control}
              render={({ field }) => (
                
                <TextField
                {...field}
                  label="Employee email"
                  placeholder="Provide employee email "
                  width='{30%}'
                  required
                />

              
              )
            }
            />
             <Controller
              name="employee.company"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Auto ID Generated"
                  placeholder=""
                  width='{30%}'
                  required
                />

              
              )}
            />
            
          <Controller
              name="employee.department"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Employee Department"
                  placeholder="Provide Employee Department"
                  width='{30%}'
                  required
                />

              
              )}
            />
           </Box>
            
          <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '25px', justifyContent: 'space-around' }}>
     
          <Controller
              name="employee.role"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Employee Role"
                  placeholder="Provide Employee Role"
                  width='{30%}'
                  required
                />

              
              )}
            />
          


               
      <Controller
          name="employee.duties"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Employee Duties"
              multiline
              rows={4}
              width='{10%}'
              required
            />
          )}
        />
           </Box>
      <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '25px', justifyContent: 'space-around' }}>
          
      <Controller
            name="employee.date_started"
            control={control}
            defaultValue={null}
            rules={{ required: "Date Started is required" }} 
            render={({ field, fieldState: { error } }) => (
              <div>
                <MyDatePicker
                  {...field}
                  label="Date Started"
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
          name="employee.date_left"
          control={control}
          defaultValue={null}
          rules={{ required: "Date Left is required" }} 
          render={({ field, fieldState: { error } }) => (
            <div>
              <MyDatePicker
                {...field}
                label="Date Left"
                control={control}
                width='{30%}'  // Adjust the width directly within the MyDatePicker component
              />
              {error && (
                <p style={{ color: 'red' }}>{error.message}</p>
              )}
            </div>
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

export default Employee;