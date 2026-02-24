import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { assets } from "../assets/assets";
import DOMPurify from "dompurify";
import {useNavigate} from 'react-router-dom'

const JobCard = ({ job }) => {

  const navigate = useNavigate()

  return (
    <Card sx={{ borderRadius: 3, p: 1 }}>
      <CardContent>
        <img src={assets.company_icon} alt="" width={45} />

        <Typography sx={{ mt: 2, fontWeight: 600 }} variant="h6">
          {job.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Chip
            label={job.location}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={job.level}
            size="small"
            color="error"
            variant="outlined"
          />
        </Box>

        <Typography
          sx={{ mt: 2, color: "gray" }}
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.description).slice(0, 150) + "..."
          }}
        />
          

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} variant="contained">Apply now</Button>

          <Button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} variant="outlined">Learn more</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
