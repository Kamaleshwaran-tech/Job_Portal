import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { purple } from "@mui/material/colors";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <Box
        sx={{
          borderRadius: 4,
          background: `linear-gradient(90deg, ${purple[700]}, ${purple[900]})`,
          textAlign: "center",
          py: 8,
          px: 3,
          color: "white",
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: { xs: "22px", sm: "30px", md: "40px" },
          }}
        >
          Over 10,000+ jobs to apply
        </Typography>

        <Typography
          sx={{
            mt: 2,
            mb: 5,
            maxWidth: "600px",
            mx: "auto",
            fontWeight: 300,
          }}
        >
          Your Next Big Career Move Starts Right Here - Explore The Best Job
          Opportunities And Take The First Step Toward Your Future!
        </Typography>

        {/* Search Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            borderRadius: 2,
            maxWidth: "700px",
            mx: "auto",
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
            <img src={assets.search_icon} alt="" width={20} />
            <TextField
              placeholder="Search for jobs"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ ml: 1 }}
              inputRef={titleRef}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
            <img src={assets.location_icon} alt="" width={20} />
            <TextField
              placeholder="Location"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ ml: 1 }}
              inputRef={locationRef}
            />
          </Box>

          <Button
            onClick={onSearch}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.2,
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            gap: 5,
            background: "#fff",
            borderRadius: 2,
            py: 2,
            px: 4,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <Typography sx={{ color: "gray", pr: "40px" }}>Trusted by</Typography>
          <img src={assets.microsoft_logo} alt="" height={28} />
          <img src={assets.walmart_logo} alt="" height={28} />
          <img src={assets.accenture_logo} alt="" height={28} />
          <img src={assets.samsung_logo} alt="" height={28} />
          <img src={assets.amazon_logo} alt="" height={28} />
          <img src={assets.adobe_logo} alt="" height={28} />
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
