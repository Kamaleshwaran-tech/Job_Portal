import Box from '@mui/material/Box'
import React from 'react'
import { assets } from '../assets/assets'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const Footer = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },   // stack on mobile
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 2, md: 0 },
          textAlign: { xs: "center", md: "left" }
        }}
      >
        {/* Logo */}
        <img src={assets.logo} alt="" />

        {/* Copyright */}
        <Typography variant="caption">
          Copyright © Kamaleshwaran.co | All rights reserved.
        </Typography>

        {/* Social icons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <img width={32} src={assets.facebook_icon} alt="" />
          <img width={32} src={assets.twitter_icon} alt="" />
          <img width={32} src={assets.instagram_icon} alt="" />
        </Box>
      </Box>
    </Container>
  )
}

export default Footer
