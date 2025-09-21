import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import { Link as RouterLink } from "react-router-dom";

export default function NavBar() {
  const pages = [
    { name: "Trending", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Random", path: "/random" },
    { name: "About", path: "/about" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={(theme) => ({
        top: 30,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        bgcolor: theme.palette.background.paper,
        borderRadius: 5,
        boxShadow: "0px 3px 8px rgba(186, 170, 255, 0.4)",
        maxWidth: "80%",
        color: theme.palette.text.primary,
      })}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo Section (clickable) */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
          }}
        >
          <LocalLibraryRoundedIcon
            sx={(theme) => ({
              color: theme.palette.primary.main,
              fontSize: 30,
              ml: 1,
              mr: 1,
            })}
          />
          <Typography
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontSize: 32,
              fontWeight: 500,
              fontStyle: "italic",
            })}
          >
            Novel Nest
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3, mr: 2 }}>
          {pages.map((page) => (
            <Typography
              key={page.name}
              component={RouterLink}
              to={page.path}
              sx={(theme) => ({
                fontSize: 18,
                color: theme.palette.text.primary,
                textDecoration: "none",
                transition: "0.2s",
                "&:hover": { color: theme.palette.primary.main },
              })}
            >
              {page.name}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
