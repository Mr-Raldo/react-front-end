import {React, useEffect, useMemo, useState} from 'react'
import AxiosInstance from './Axios'
import { MaterialReactTable } from 'material-react-table';
import Dayjs from 'dayjs';
import { Box, Typography,IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {Link} from 'react-router-dom'







const Home = () => {


  const [myData,setMydata] = useState()
  const [mappedEmployees,setMyEdata]= useState()
  const [loading,setLoading] = useState(true)

  const GetData = () => {
    AxiosInstance.get(`company/`).then((res) =>{
      setMydata(res.data)
      console.log(res.data)
      
 
    })

  }
  const GetEData = async () => {
    try {
      // Fetch the list of companies
      const companiesResponse = await AxiosInstance.get(`company/`);
      
      const companies = companiesResponse.data;
  
      // Fetch the employee data
      const employeeResponse = await AxiosInstance.get(`employee/`);
      const employees = employeeResponse.data;
  
      // Define the getCompanyName function
      const getCompanyName = (companyId, companies) => {
        const company = companies.find(company => company.id === companyId);
        return company ? company.name : 'Unknown Company';
      };
  
      // Map the company IDs to their corresponding names
      const mappedEmployees = employees.map(employee => ({
        ...employee,
        company: getCompanyName(employee.company, companies),
      
      }));
  
      setMyEdata(mappedEmployees);
      // console.log('fetching employeeMapped data:');
      // console.log(mappedEmployees)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setLoading(false);
    }
  };
  
  

  // Assuming 'companies' is the array of company objects with 'id' and 'name' properties


  

  useEffect(() => {
    GetData();
    GetEData();
    
  },[] )

    
  const columnsE = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 110,
      },
      {
        accessorKey: 'employee_id', //normal accessorKey
        header: 'Employee id',
        size: 110,
      },
      {
        accessorKey: 'contact_phone',
        header: 'Contac Number',
        size: 110,
      },
      {
        accessorKey: 'company',
        header: 'Company',
        size: 110,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 110,
      },
      {
        accessorKey: 'department',
        header: 'Department',
        size: 90,
      },
      {
        accessorKey: 'duties',
        header: 'Duties',
        size: 90,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 90,
      },
      {
        accessorFn: (row) => Dayjs(row.date_started).format('DD-MM-YYYY'),
        header: 'Date Started',
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.date_left).format('DD-MM-YYYY'),
        header: 'Date Left',
        size: 90,
      },
    ],
    [],
  );

        const columnsC = useMemo(
      () => [
        {
          accessorKey: 'name', //access nested data with dot notation
          header: 'Name',
          size: 150,
        },
        {
          accessorKey: 'address', //normal accessorKey
          header: 'Address',
          size: 200,
        },
        {
          accessorKey: 'registration_number',
          header: 'Registration Number',
          size: 150,
        },
        {
          accessorKey: 'number_of_employees',
          header: 'Number of employees',
          size: 150,
        },
        {
          accessorKey: 'list_of_departments',
          header: 'list of departments',
          size: 150,
        },
        {
          accessorKey: 'contact_person',
          header: 'Contact Person',
          size: 150,
        },
        {
          accessorKey: 'contact_phone',
          header: 'Contact Phone',
          size: 150,
        },
        {
          accessorFn: (row) => Dayjs(row.registration_date).format('DD-MM-YYYY'),
          header: 'Registration Date',
          size: 150,
        },
      ],
      [],
    );
    // console.log('fetching employeeMapped data at end:');
    // console.log(mappedEmployees)
  return (
    <div>
      <div>
        { loading ? <p>Loading data...</p> :
        <Box sx={{ backgroundColor: '#00003f', marginBottom: '5px' }}>
      <Typography sx={{ marginLeft: '20px', color: '#fff', padding: '20px' }}>
            Company Details
        </Typography>
        <MaterialReactTable 
            columns={columnsC} 
            data={myData} 
            enableRowActions
            renderRowActions={({row}) => (
                <Box>
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" component={Link} to={`cdelete/${row.original.id}`}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            )}
        />
    </Box>
    


          
        }
      </div>  

      <div>
        { loading ? <p>Loading data...</p> :
       <Box sx={{ backgroundColor: '#00003f', marginTop: '40px' }}>
      <Typography sx={{ marginLeft: '20px', color: '#fff', padding: '20px' }}>
           Employee Details
       </Typography>
       <MaterialReactTable 
           columns={columnsE} 
           data={mappedEmployees} 
           enableRowActions
           renderRowActions={({row}) => (
               <Box>
                   <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                       <IconButton color="secondary" component={Link} to={`edite/${row.original.employee_id}`}>
                           <EditIcon />
                       </IconButton>
                       <IconButton color="error" component={Link} to={`edelete/${row.original.employee_id}`}>
                           <DeleteIcon />
                       </IconButton>
                   </Box>
               </Box>
           )}
       />
   </Box>
   

          
        }
      </div>   
    


    </div>
    
  )
}

export default Home