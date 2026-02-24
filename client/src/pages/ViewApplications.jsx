import { Box, Button, Chip, Container, Link, Table, TableBody, TableCell, TableHead, TableRow,IconButton,
  Menu,
  MenuItem,
  Typography } from '@mui/material'
import React,{useState} from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ViewApplications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = () => {
    console.log("Accepted");
    handleClose();
  };

  const handleReject = () => {
    console.log("Rejected");
    handleClose();
  };
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
            {viewApplicationsPageData.map((applicant,index) =>(
               <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Box sx={{display:'flex',alignItems:'center'}}>
                  <img src={applicant.imgSrc} alt="" />
                <Chip label={applicant.name} sx={{
                  background:'none'
                }}/>
                </Box>
                
              </TableCell>
              <TableCell>{applicant.jobTitle}</TableCell>
              <TableCell>{applicant.location}</TableCell>
              <TableCell>
                <Link to='' target='_blank'>
                
                  <Button variant='outlined' sx={{textDecoration:'none',
                  display:'flex',
                  
                  gap:1}}>Resume <img src={assets.resume_download_icon} alt="" /> </Button>
                
                  
                </Link>
              </TableCell>
              <TableCell>
                 <Box>
      {/* Three Dots Button */}
      <IconButton onClick={handleOpen} size="small">
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
        <MenuItem onClick={handleAccept}>
          <Typography sx={{ color: "green" }}>Accept</Typography>
        </MenuItem>

        <MenuItem onClick={handleReject}>
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