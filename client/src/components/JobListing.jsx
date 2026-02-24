import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  JobCategories,
  JobLocations,
} from "../assets/assets";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import JobCard from "./JobCard";
import Button from "@mui/material/Button";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle location selection
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  // Filtering logic
  useEffect(() => {

  const newFilteredJobs = jobs
    .slice()
    .reverse()
    .filter(job => {

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);

      const locationMatch =
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.location);

      const titleMatch =
        !searchFilter.title ||
        job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

      const searchLocationMatch =
        !searchFilter.location ||
        job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

      return categoryMatch && locationMatch && titleMatch && searchLocationMatch;
    });

  setFilteredJobs(newFilteredJobs);
  setCurrentPage(1);

}, [jobs, selectedCategories, selectedLocations, searchFilter]);

  // Pagination (IMPORTANT: based on filteredJobs)
  const jobsPerPage = 6;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        
        {/* Sidebar */}
        <Grid
        size={{xs:12,md:2}}
          item
          xs={12}
          md={3}
          sx={{
            display: {
              xs: showFilter ? "block" : "none",
              md: "block"
            }
          }}
        >
          {isSearched &&
            (searchFilter.title || searchFilter.location) && (
              <>
                <Typography sx={{ mb: 2 }}>Current Search</Typography>

                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  {searchFilter.title && (
                    <Chip
                      label={searchFilter.title}
                      onDelete={() =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          title: "",
                        }))
                      }
                    />
                  )}
                  {searchFilter.location && (
                    <Chip
                      label={searchFilter.location}
                      onDelete={() =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          location: "",
                        }))
                      }
                    />
                  )}
                </Box>
              </>
            )}

          <Typography variant="h6">Search by Categories</Typography>
          <List sx={{ p: 0 }}>
            {JobCategories.map((category, index) => (
              <ListItem disableGutters key={index}>
                <Checkbox
                  size="small"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                <Typography variant="body2">{category}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Search by Location
          </Typography>
          <List sx={{ p: 0 }}>
            {JobLocations.map((location, index) => (
              <ListItem disableGutters key={index}>
                <Checkbox
                  size="small"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                <Typography variant="body2">{location}</Typography>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Jobs Section */}
        <Grid 
        size={{xs:12,md:10}}
        item xs={12} md={9}>
          <Button
            sx={{ display: { xs: "block", md: "none" }, mb: 2 }}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {showFilter ? "Close Filter" : "Show Filter"}
          </Button>

          <Typography variant="h4">Latest jobs</Typography>
          <Typography variant="body2" sx={{ mb: 3, mt: 1 }}>
            Get your desired job from top companies
          </Typography>

          {/* Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {paginatedJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
};

export default JobListing;
