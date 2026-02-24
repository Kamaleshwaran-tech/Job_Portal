import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { assets, jobsApplied } from "../assets/assets";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import moment from "moment";
import Chip from "@mui/material/Chip";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4">Your Resume</Typography>
          <Box sx={{ mt: 2, mb: 3 }}>
            {isEdit ? (
              <Box>
                <InputLabel htmlFor="resumeUpload">
                  <Typography variant="h6">Select Resume</Typography>
                  <input
                    id="resumeUpload"
                    onClick={(e) => setResume(e.target.files[0])}
                    accept="application/pdf"
                    type="file"
                  />
                  <img src={assets.profile_upload_icon} alt="" />
                </InputLabel>
                <Button
                  onClick={(e) => setIsEdit(false)}
                  variant="contained"
                  sx={{ backgroundColor: "green", mt: 2 }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button sx={{ bgcolor: "#b0c7f5", color: "#2563eb" }}>
                  <Link to="" sx={{ textDecoration: "none" }}>
                    Resume
                  </Link>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ color: "gray", borderColor: "gray" }}
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4">Jobs Applied</Typography>
          <Table
            sx={{
              border: "2px solid #e5e7eb",
              borderRadius: 26,

              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Company
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Job Title
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Location
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsApplied.map((job, index) =>
                true ? (
                  <TableRow>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img src={job.logo} alt="" />
                        {job.company}
                      </Box>
                    </TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{moment(job.date).format("ll")}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        color={
                          job.status === "Accepted"
                            ? "success"
                            : job.status === "Pending"
                              ? "warning"
                              : "error"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ) : null,
              )}
            </TableBody>
          </Table>
        </Box>
      </Container>
      <Footer/>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    </>
  );
};

export default Applications;
