import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import moment from "moment";
import Container from "@mui/material/Container";
import DOMPurify from "dompurify";
import JobCard from "../components/JobCard";
import Grid from "@mui/material/Grid";
import Footer from "../components/Footer";

const ApplyJob = () => {
  const { id } = useParams();

  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  };
  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return JobData ? (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 4,
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            border: "1px solid #3b76ee",
            backgroundColor: "#ccd9ec",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          {/* Left section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              component="img"
              src={JobData.companyId.image}
              alt=""
              sx={{
                width: 70,
                height: 70,
                borderRadius: 2,
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                p: 1,
              }}
            />

            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, letterSpacing: 0.3 }}
              >
                {JobData.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 1.5,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  size="small"
                  icon={<img src={assets.suitcase_icon} width={16} />}
                  label={JobData.companyId.name}
                />
                <Chip
                  size="small"
                  icon={<img src={assets.location_icon} width={16} />}
                  label={JobData.location}
                />
                <Chip
                  size="small"
                  icon={<img src={assets.person_icon} width={16} />}
                  label={JobData.level}
                />
                <Chip
                  size="small"
                  icon={<img src={assets.money_icon} width={16} />}
                  label={`CTC : ${kconvert.convertTo(JobData.salary)}`}
                />
              </Box>
            </Box>
          </Box>

          {/* Right section */}
          <Box
            sx={{
              textAlign: { xs: "left", sm: "right" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Apply now
            </Button>

            <Typography
              variant="caption"
              sx={{ display: "block", mt: 1, color: "text.secondary" }}
            >
              Posted {moment(JobData.date).fromNow()}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              <Typography
                variant="h5"
                sx={{ mt: 4, fontWeight: 700, letterSpacing: 0.3 }}
              >
                Job description
              </Typography>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(JobData.description),
                }}
              />
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  mt: 2,
                }}
              >
                Apply now
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mt: 5 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                More jobs from {JobData.companyId.name}
              </Typography>
              <Box sx={{display:'flex',flexDirection:'column',gap:2}}>
                {jobs
                .filter(
                  (job) =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id,
                )
                .filter((job) => true)
                .slice(0, 2)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </Box>
              
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </div>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
