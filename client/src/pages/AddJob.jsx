import React, { useState, useRef,useEffect } from "react";
import Quill from "quill";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    level: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
  if (!quillRef.current && editorRef.current) {
    quillRef.current = new Quill(editorRef.current,{
      theme:'snow',
    })
  }

  
}, []);

  return (
    <div>
      <Box sx={{ p: 4, maxWidth: 700 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Job Title */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            Job Title
          </Typography>
          <TextField
            fullWidth
            name="title"
            placeholder="Type here"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />

          {/* Job Description */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            Job Description
          </Typography>
          <Box
            sx={{pt:1,
              mb: 3,
              "& .ql-container": {
                minHeight: "180px",
                borderRadius: 2,
              },
              display:'flex',
              flexDirection:'column',
              gap:1
            }}
          >
            <div ref={editorRef} />
          </Box>

          {/* Category, Location, Level */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 4 }} item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Job Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Job Category"
                  onChange={handleChange}
                >
                  {JobCategories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Job Location</InputLabel>
                <Select
                  name="location"
                  value={formData.location}
                  label="Job Location"
                  onChange={handleChange}
                >
                  {JobLocations.map((location, index) => (
                    <MenuItem key={index} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Job Level</InputLabel>
                <Select
                  name="level"
                  value={formData.level}
                  label="Job Level"
                  onChange={handleChange}
                >
                  <MenuItem value="Junior Level">Junior Level</MenuItem>
                  <MenuItem value="Mid Level">Mid Level</MenuItem>
                  <MenuItem value="Senior Level">Senior Level</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Salary */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            Salary
          </Typography>
          <TextField
            name="salary"
            type="number"
            placeholder="0"
            value={formData.salary}
            onChange={handleChange}
            sx={{ mb: 3, width: 200 }}
            required
          />

          {/* Button */}
          <Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "black",
                px: 4,
                py: 1,
                borderRadius: 1,
                "&:hover": { bgcolor: "#222" },
              }}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddJob;
