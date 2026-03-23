import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { assets } from "../assets/assets";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import moment from "moment";
import Chip from "@mui/material/Chip";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [applications, setApplications] = useState([]);

  const { backendUrl } = useContext(AppContext);
  const { getToken } = useAuth();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const fetchData = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const token = await getToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [userRes, applicationsRes] = await Promise.all([
        axios.get(`${backendUrl}/api/users/user`, { headers }),
        axios.get(`${backendUrl}/api/users/application`, { headers }),
      ]);

      if (userRes.data.success) {
        setUserData(userRes.data.user);
      }

      if (applicationsRes.data.success) {
        setApplications(applicationsRes.data.applications);
      } else {
        toast.error(applicationsRes.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateResume = async () => {
    if (!resume) {
      toast.error("Please select a resume");
      return;
    }

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("resume", resume);

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setResume(null);
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Please login to view your applications.
          </Typography>
          <Button variant="contained" onClick={() => openSignIn()}>
            Login
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Container maxWidth="lg" component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4">Your Resume</Typography>
          <Box sx={{ mt: 2, mb: 3 }}>
            {isEdit ? (
              <Box>
                <InputLabel htmlFor="resumeUpload">
                  <Typography variant="h6">Select Resume</Typography>
                  <input
                    id="resumeUpload"
                    onChange={(e) => setResume(e.target.files[0])}
                    accept="application/pdf"
                    type="file"
                  />
                  <img src={assets.profile_upload_icon} alt="" />
                </InputLabel>
                <Button
                  onClick={updateResume}
                  variant="contained"
                  sx={{ backgroundColor: "green", mt: 2 }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  sx={{ bgcolor: "#b0c7f5", color: "#2563eb" }}
                  component="a"
                  href={userData?.resume || "#"}
                  target="_blank"
                  disabled={!userData?.resume}
                >
                  {userData?.resume ? "View Resume" : "No Resume"}
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
              {applications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img src={application.companyId?.image} alt="" width={26} />
                        {application.companyId?.name}
                      </Box>
                    </TableCell>
                    <TableCell>{application.jobId?.title}</TableCell>
                    <TableCell>{application.jobId?.location}</TableCell>
                    <TableCell>{moment(application.date).format("ll")}</TableCell>
                    <TableCell>
                      <Chip
                        label={application.status}
                        color={
                          application.status === "Accepted"
                            ? "success"
                            : application.status === "Pending"
                              ? "warning"
                              : "error"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
      <Footer  />
    </Box>
  );
};

export default Applications;
