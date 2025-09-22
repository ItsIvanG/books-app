import { useState } from "react";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Stack,
  Chip,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import DevicesIcon from "@mui/icons-material/Devices";
import StorageIcon from "@mui/icons-material/Storage";
import TerminalIcon from "@mui/icons-material/Terminal";
import BrushIcon from "@mui/icons-material/Brush";
import BugReportIcon from "@mui/icons-material/BugReport";
import BuildIcon from "@mui/icons-material/Build";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import EmojiObjectsRoundedIcon from "@mui/icons-material/EmojiObjectsRounded";

function TabPanel({ children, value, index }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ mt: 3, width: "100%", textAlign: "center" }}
    >
      {value === index && children}
    </Box>
  );
}

export default function AboutPage() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        py: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          py: 3,
          borderRadius: 3,
          maxWidth: 700,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Instrument Serif", serif',
            fontWeight: 500,
            mb: 4,
            letterSpacing: -1,
          }}
        >
          The Developers
        </Typography>

        <Avatar
          alt="The Developers"
          src="gew.jpg"
          sx={{ width: 250, height: 250, mb: 4, boxShadow: 2 }}
        />

        {/* Names */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Inter", serif',
              fontWeight: 120,
              letterSpacing: -1,
            }}
          >
            Ivan Gonzales
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 500,
              letterSpacing: -1,
              fontStyle: "italic",
            }}
          >
            &
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Inter", serif',
              fontWeight: 120,
              letterSpacing: -1,
            }}
          >
            Andrea Dela Torre
          </Typography>
        </Stack>

        {/* Description */}
        <Typography
          sx={{
            fontSize: 15,
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontStyle: "italic",
            color: "text.secondary",
            mb: 2,
          }}
        >
          Full stack developers passionate about creating simple pero elepante
          web applications.
        </Typography>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab icon={<EmojiObjectsRoundedIcon />} label="Skills" />
          <Tab icon={<SchoolRoundedIcon />} label="Education" />
          <Tab icon={<WorkRoundedIcon />} label="Experience" />
        </Tabs>

        {/* Skills Tab */}
        <TabPanel value={tab} index={0}>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 700,
              mx: "auto",
              mb: -0.7,
            }}
          >
            <Chip
              icon={<CodeIcon />}
              variant="outlined"
              label="JavaScript"
              color="primary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<CodeIcon />}
              variant="outlined"
              label="Python"
              color="primary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<CodeIcon />}
              variant="outlined"
              label="C++"
              color="primary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<CodeIcon />}
              variant="outlined"
              label="Java"
              color="primary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<CodeIcon />}
              variant="outlined"
              label="PHP"
              color="primary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<WebIcon />}
              variant="outlined"
              label="React"
              color="secondary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<DevicesIcon />}
              variant="outlined"
              label="HTML & CSS"
              color="secondary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<StorageIcon />}
              variant="outlined"
              label="MySQL"
              color="secondary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<StorageIcon />}
              variant="outlined"
              label="MongoDB"
              color="secondary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<TerminalIcon />}
              variant="outlined"
              label="Node.js"
              color="secondary"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<BrushIcon />}
              variant="outlined"
              label="UI/UX Design"
              color="success"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<BugReportIcon />}
              variant="outlined"
              label="Debugging"
              color="success"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
            <Chip
              icon={<BuildIcon />}
              variant="outlined"
              label="Git & GitHub"
              color="success"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            />
          </Stack>
        </TabPanel>

        {/* Education Tab */}
        <TabPanel value={tab} index={1}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Inter", sans-serif',
              color: "text.primary",
              mt: 1.5,
            }}
          >
            Bachelor of Science in Information Technology
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: '"Inter", sans-serif',
              color: "text.secondary",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            Bulacan State University
          </Typography>
        </TabPanel>

        {/* Experience Tab */}
        <TabPanel value={tab} index={2}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Inter", sans-serif',
              color: "text.primary",
              mt: 1.5,
            }}
          >
            IT Trainee
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: '"Inter", sans-serif',
              color: "text.secondary",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            Citco International Support Services Limited
          </Typography>
        </TabPanel>

        {/* Footer description */}
        <Typography
          variant="body2"
          sx={{
            mt: 4,
            fontFamily: '"Inter", sans-serif',
            color: "text.secondary",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Novel Nest was built using React, Material-UI, and the Open Library
          API.
          {"\n\n"}
          It features responsive design, dark theme, and modern UI components.
        </Typography>
      </Container>
    </Box>
  );
}
