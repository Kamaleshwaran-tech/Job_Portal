import { Box, Button, Chip, Container, Link, Table, TableBody, TableCell, TableHead, TableRow,IconButton,
  Menu,
  MenuItem,
  Typography } from '@mui/material'
import React,{useContext, useEffect, useState} from 'react'
import { assets } from '../assets/assets'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewApplications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState([]);
  const open = Boolean(anchorEl);
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyApplicants = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants', {
        headers: { token: companyToken }
      });

      if (data.success) {
        setApplications(data.applicants);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleOpen = (event, application) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplication(application);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedApplication(null);
  };

  const changeStatus = async (status) => {
    if (!selectedApplication) return;

    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-status',
        { id: selectedApplication._id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyApplicants();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyApplicants();
    }
  }, [companyToken]);

  return (
    <div><Container>
      <Box>
        <Table sx={{border:'1px solid #e0e0e0'}}>
          <TableHead>
            <TableRow >
              <TableCell sx={{fontWeight:600}}>#</TableCell>
              <TableCell sx={{fontWeight:600}}>User Name</TableCell>
              <TableCell sx={{fontWeight:600}}>Job Title</TableCell>
              <TableCell sx={{fontWeight:600}}>Location</TableCell>
              <TableCell sx={{fontWeight:600}}>Resume</TableCell>
              <TableCell sx={{fontWeight:600}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((applicant,index) =>(
               <TableRow key={applicant._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Box sx={{display:'flex',alignItems:'center'}}>
                  <img src={applicant.userId?.image} alt="" width={28} />
                <Chip label={applicant.userId?.name} sx={{
                  background:'none'
                }}/>
                </Box>
                
              </TableCell>
              <TableCell>{applicant.jobId?.title}</TableCell>
              <TableCell>{applicant.jobId?.location}</TableCell>
              <TableCell>
                <Link href={applicant.userId?.resume || '#'} target='_blank' underline="none">
                
                  <Button variant='outlined' disabled={!applicant.userId?.resume} sx={{textDecoration:'none',
                  display:'flex',
                  
                  gap:1}}>Resume <img src={assets.resume_download_icon} alt="" /> </Button>
                
                  
                </Link>
              </TableCell>
              <TableCell>
                 <Box>
      {/* Three Dots Button */}
      <IconButton onClick={(event) => handleOpen(event, applicant)} size="small">
        <MoreHorizIcon />
      </IconButton>

      {/* Popup Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            minWidth: 120
          }
        }}
      >
        <MenuItem onClick={() => changeStatus('Accepted')}>
          <Typography sx={{ color: "green" }}>Accept</Typography>
        </MenuItem>

        <MenuItem onClick={() => changeStatus('Rejected')}>
          <Typography sx={{ color: "red" }}>Reject</Typography>
        </MenuItem>
      </Menu>
    </Box>
              </TableCell>
            </TableRow>
            ))}
           
          </TableBody>
        </Table>
      </Box>
    </Container>
      
    </div>
  )
}

export default ViewApplications
