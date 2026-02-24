import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(null);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state == "Sign Up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
    }
  };

  return (
    <div>
      <Modal
        open={showRecruiterLogin}
        onClose={() => setShowRecruiterLogin(false)}
      >
        <Box
        component="form" onSubmit={onSubmitHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Recruiter {state}</Typography>
            <Typography variant="body2" sx={{ pt: 2 }}>
              Welcome back! Please sign in to continue
            </Typography>
          </Box>
          
            {state === "Sign Up" && isTextDataSubmitted ? (
              <>
                <Box sx={{ textAlign: "center" }}>
                  {/* Upload clickable area */}
                  <Button
                    component="label"
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: "1px dashed #d1d5db",
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      cursor: "pointer",
                      bgcolor: "#f9fafb",
                      "&:hover": {
                        bgcolor: "#f3f4f6",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        image ? URL.createObjectURL(image) : assets.upload_area
                      }
                      alt=""
                      sx={{ width: 80 }}
                    />

                    <Typography variant="body2" color="text.secondary">
                      Upload Company <br /> Logo
                    </Typography>

                    <input
                      type="file"
                      hidden
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    pt: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    pb: 1,
                  }}
                >
                  {state !== "Login" && (
                    <TextField
                      required
                      placeholder="Company name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBoxIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 10,
                          "& fieldset": { borderColor: "#e5e7eb" },
                          "&:hover fieldset": { borderColor: "#e5e7eb" },
                          "&.Mui-focused fieldset": { borderColor: "#e5e7eb" },
                        },
                        width: "80%",
                      }}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                    />
                  )}

                  <TextField
                    placeholder="Email Id"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                        "& fieldset": { borderColor: "#e5e7eb" },
                        "&:hover fieldset": { borderColor: "#e5e7eb" },
                        "&.Mui-focused fieldset": { borderColor: "#e5e7eb" },
                      },
                      width: "80%",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required
                  />
                  <TextField
                    placeholder="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                        "& fieldset": { borderColor: "#e5e7eb" },
                        "&:hover fieldset": { borderColor: "#e5e7eb" },
                        "&.Mui-focused fieldset": { borderColor: "#e5e7eb" },
                      },
                      width: "80%",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                  />
                </Box>
              </>
            )}
            {state === "Login" && (
              <Link to="" sx={{ ml: 7, mt: 5 }}>
                Forget Password?
              </Link>
            )}

            <Box
              sx={{
                pt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "80%", borderRadius: 5 }}
              >
                {state === "Login"
                  ? "Login"
                  : isTextDataSubmitted
                    ? "Create Account"
                    : "next"}
              </Button>
            </Box>
          

          {state === "Login" ? (
            <Box
              sx={{ pt: 2, display: "flex", justifyContent: "center", gap: 1 }}
            >
              <Typography>Don't have an account? </Typography>
              <Link component="button" onClick={() => setState("Sign Up")}>
                Sign up
              </Link>
            </Box>
          ) : (
            <Box
              sx={{ pt: 2, display: "flex", justifyContent: "center", gap: 1 }}
            >
              <Typography>Already have an account? </Typography>
              <Link component="button" onClick={() => setState("Login")}>
                Login
              </Link>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default RecruiterLogin;
