import { Table, TableHead, TableRow ,TableCell, TableBody, InputLabel, Input, Box, Button} from '@mui/material'
import React from 'react'
import { assets, manageJobsData } from '../assets/assets'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'

const ManageJobs = () => {

  const navigate = useNavigate()

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
          {manageJobsData.map((job,index) =>(
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{moment(job.date).format('ll')}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.applicants}</TableCell>
              <TableCell>
                <input type='checkbox' />
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