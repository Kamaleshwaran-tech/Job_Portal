import React, { useContext } from "react";
import { assets } from "../assets/assets";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate  = useNavigate();

  const {setShowRecruiterLogin} = useContext(AppContext);

  return (
    <Box sx={{ boxShadow: "0px 2px 6px rgba(0,0,0,0.15)" }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          py: 2,
          gap: { xs: 1, sm: 0 }
        }}
      >
        {/* Logo */}
        <Box onClick={()=> navigate('/')}  component="img"  src={assets.logo} alt="" sx={{ height: 40, cursor:'pointer' }} />

        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2
            }}
          >
            <Link href="/applications" underline="none">
              Applied Jobs
            </Link>

            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Hi, {user.firstName} {user.lastName}
            </Typography>

            <UserButton />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap"
            }}
          >
            <Button onClick={e => setShowRecruiterLogin(true)} variant="text" sx={{ color: "GrayText" }}>
              Recruiter Login
            </Button>

            <Button
              onClick={() => openSignIn()}
              variant="contained"
              sx={{ borderRadius: 10 }}
            >
              Login
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
