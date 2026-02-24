import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import React from 'react'
import { assets } from '../assets/assets'
import Container from '@mui/material/Container'

const AppDownload = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "lavenderblush",
          borderRadius: 4,
          p: { xs: 3, md: 8 },
          textAlign: { xs: "center", md: "left" }
        }}
      >

        {/* Left content */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "22px", md: "36px" },
              fontWeight: 600
            }}
          >
            Download Mobile App For Better Experience
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: { xs: "center", md: "flex-start" }
            }}
          >
            <Link>
              <img
                src={assets.play_store}
                alt=""
                style={{ width: "180px" }}
              />
            </Link>

            <Link>
              <img
                src={assets.app_store}
                alt=""
                style={{ width: "180px" }}
              />
            </Link>
          </Box>
        </Box>

        {/* Right image */}
        <Box
          component="img"
          src={assets.app_main_img}
          alt=""
          sx={{
            width: { xs: "10%", md: "20%" },
            display:{xs: 'none',md:'block'},
            mr: {xs:2,md:18}
          }}
        />
      </Box>
    </Container>
  )
}

export default AppDownload
