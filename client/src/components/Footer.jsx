import Box from '@mui/material/Box'
import React from 'react'
import { assets } from '../assets/assets'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const socialLinks = [
  {
    name: 'Facebook',
    icon: assets.facebook_icon,
    href: 'https://www.facebook.com/login/',
  },
  {
    name: 'X',
    icon: assets.twitter_icon,
    href: 'https://x.com/i/flow/login',
  },
  {
    name: 'Instagram',
    icon: assets.instagram_icon,
    href: 'https://www.instagram.com/accounts/login/',
  },
]

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
          {socialLinks.map((social) => (
            <Box
              key={social.name}
              component="a"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} login`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                component="img"
                width={32}
                src={social.icon}
                alt={`${social.name} icon`}
                sx={{ display: "block" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default Footer
