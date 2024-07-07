import  {React, useEffect, useState}from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller  } from 'react-hook-form';

import AxiosInstance from './Axios';

import {useNavigate, useParams} from 'react-router-dom'

const CDelete = () => {
  const MyParam = useParams();
  const MyId = MyParam.id;


  const [myData,setMydata] = useState()
  const [mappedEmployees,setMyEdata]= useState()
  const [loading,setLoading] = useState(true)

  const GetData = () => {
    AxiosInstance.get(`company/${MyId}/`).then((res) =>{
      setMydata(res.data)
      console.log('My data has been printed below')
      console.log(myData)
      
      console.log(res.data)
      setLoading(false);
 
    })

  }


 // Use the useState hook
  const navigate = useNavigate();



  useEffect(() => {
    console.log(MyId)
    GetData();
    
    
  }, )


   

  const onSubmit = (data) => {
   
  // Post request for company data
   

  AxiosInstance.delete(`company/${MyId}/`, {
   
  })
    .then((companyResponse) => {
      
      navigate(`/`)

  })
    .catch((companyError) => {
      console.error('Error saving Company data:', companyError);
    });

 
};
  return (
    <div>
        { loading ? <p>Loading data ....</p>:
        <div>
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '5px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff', padding: '20px' }}>
            Delete Company: {myData.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', boxShadow: 4, marginBottom: '20px', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', marginBottom: '40px',marginTop: '50px',marginLeft:'75px', justifyContent: 'start' }}>
                 Are you sure you want to delete company : {myData.name} ?
            
              
            </Box>
        </Box>
 


        <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '20px', width: '100%', justifyContent: 'flex-end' }}>
          <Box sx={{ width: '30%' }}>
            <Button variant="contained" onClick={onSubmit}>Delete</Button>
          </Box>
        </Box>
        </div>
       }
    </div>
  );
};

export default CDelete;
