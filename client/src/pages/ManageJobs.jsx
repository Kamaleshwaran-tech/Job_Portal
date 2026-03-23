import { Table, TableHead, TableRow ,TableCell, TableBody, Box, Button} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ManageJobs = () => {

  const navigate = useNavigate()

  const [jobs,setJobs] = useState([])

  const {backendUrl, companyToken} = useContext(AppContext)

  //function to fetch company job application data
  const fetchCompanyJobs = async () =>{

    try {
      
      const {data} = await axios.get(backendUrl+'/api/company/list-jobs',
        {headers:{token:companyToken}}
      )

      if (data.success) {
        setJobs(data.jobsData.reverse())
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-visibility',
        { id },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() =>{
    if (companyToken) {
      fetchCompanyJobs()
    }

  },[companyToken])

  return (
    <div>
      <Table sx={{border:'1px solid #e0e0e0'}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:600}}>#</TableCell>
            <TableCell sx={{fontWeight:600}}>Job Title</TableCell>
            <TableCell sx={{fontWeight:600}}>Date</TableCell>
            <TableCell sx={{fontWeight:600}}>Location</TableCell>
            <TableCell sx={{fontWeight:600}}>Applicants</TableCell>
            <TableCell sx={{fontWeight:600}}>Visible</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job,index) =>(
            <TableRow key={job._id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{moment(job.date).format('ll')}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.applicants}</TableCell>
              <TableCell>
                <input type='checkbox' checked={job.visible} onChange={() => changeJobVisibility(job._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{mt:4 ,display:'flex',justifyContent:'end'}}>
        <Button onClick={() => navigate('/dashboard/add-job')} variant='contained' sx={{backgroundColor:'black',color:'white'}}>Add New Job</Button>
      </Box>
    </div>
  )
}

export default ManageJobs
