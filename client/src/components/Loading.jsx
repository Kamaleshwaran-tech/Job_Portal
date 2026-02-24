import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <div>
        <LinearProgress/>
      <Box sx={{
    display: "flex",
    justifyContent: "center",   // horizontal center
    alignItems: "center",       // vertical center
    minHeight: "100vh"          // full page height
  }}>
        <CircularProgress/>
      </Box>
    </div>
  )
}

export default Loading