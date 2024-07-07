import React , { useState, useEffect }from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller,useWatch  } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import {useNavigate,useParams} from 'react-router-dom'

const EDelete = () => {
  const { handleSubmit,setValue ,control } = useForm();
  const MyParam = useParams();
  const employeeId = MyParam.id;
  const navigate = useNavigate()


  const [myData,setMydata] = useState()
  const [loading, setLoading] = useState(true); 
  

  const [companies, setCompanies] = useState([]); // State to hold the list of companies
  const [selectedCompany, setSelectedCompany] = useState(''); // State to hold the selected company


  
const GetData = () => {
    AxiosInstance.get(`employee/${employeeId}/`).then((res) => {
      setMydata(res.data)
      console.log('Mydata in logs')
      console.log(myData);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(employeeId)
    GetData();
    
    
  }, )
  

  // Function to handle company selection
 
  const onSubmit = (data) => {
    
    // Delete request for company data
  AxiosInstance.delete(`employee/${employeeId}/`, {
   
    
  })
    .then((employeeResponse) => {
      
      navigate(`/`)

  })
    .catch((employeeError) => {
      console.error('Error saving employee data:', employeeError);
    });

};


  return (
    <div>
      { loading ? <p>Loading data ....</p>:
        <div>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '5px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff', padding: '20px' }}>
          Delete the Employee with ID : {myData.employee_id}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', boxShadow: 4, marginBottom: '20px', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', marginBottom: '40px',marginTop: '50px',marginLeft:'75px', justifyContent: 'start' }}>
                 Are you sure you want to this employee : {myData.employee_id} ?
            
              
            </Box>
    
        
        </Box>
    
      


        <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '20px', width: '100%', justifyContent: 'flex-end' }}>
          <Box sx={{ width: '30%' }}>
            <Button variant="contained" onClick={onSubmit}>Delete</Button>
          </Box>
        </Box>
     
      </div>}
    </div>
  );
};

export default EDelete;
