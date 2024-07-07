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
import {useNavigate,useParams} from 'react-router-dom'

const EditE = () => {
  const { handleSubmit,setValue ,control } = useForm();
  const MyParam = useParams();
  const employeeId = MyParam.id;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true); 
  const [companies, setCompanies] = useState([]); // State to hold the list of companies
  const [selectedCompany, setSelectedCompany] = useState(''); // State to hold the selected company


  
const GetData = () => {
    AxiosInstance.get(`employee/${employeeId}/`).then((res) => {
      console.log(res.data);
      setValue('employee.name',res.data.name)
      setValue('employee.employee_id',res.data.employee_id)
      setValue('employee.address',res.data.address)
      setValue('employee.contact_phone',res.data.contact_phone)
      setValue('employee.email',res.data.email)
      setValue('employee.company',res.data.company)
      setValue('employee.date_started',Dayjs(res.data.date_started))
      setValue('employee.date_left',Dayjs(res.data.date_left))
      setValue('employee.department',res.data.department)
      setValue('employee.duties',res.data.duties)
      setValue('employee.role',res.data.role)
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(employeeId)
    GetData();
    
    
  }, )
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
  AxiosInstance.put(`employee/${employeeId}/`, {
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
                />

              
              )}
            />
           
       
   
        
            <Controller
              name="employee.company"
              control={control}
              width='{30%}'
              placeholder="Select Company Name"
              render={({ field }) => (
                
                <select {...field} value={selectedCompany} onChange={(e) => {
                  field.onChange(e);
                  setSelectedCompany(e.target.value);
                  
                }}>
                  <option value="">Select Company</option>
                  {/* Dynamically populate options based on the retrieved list of companies */}
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
                
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
                />

              
              )}
            />
           </Box>
            
          <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '25px', justifyContent: 'space-around' }}>
     
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
            />
          )}
        />
           </Box>
      <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '25px', justifyContent: 'space-around' }}>
          
             <Controller
                name="employee.date_started"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <MyDatePicker
                  {...field}
                  
                  label="Date Started"
                  control={control}
                  width='{30%}'  // Adjust the width directly within the MyDatePicker component
                  />
                )}
              />
               <Controller
                name="employee.date_left"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <MyDatePicker
                  {...field}
                  
                  label="Date Left"
                  control={control}
                  width='{30%}'  // Adjust the width directly within the MyDatePicker component
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

export default EditE;
