import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import { Link as RouterLink } from "react-router-dom";

export default function NavBar() {
  const pages = [
    { name: "Trending", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Random", path: "/random" },
    { name: "About", path: "/about" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
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
          maxWidth: "90%",
          color: theme.palette.text.primary,
        })}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
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

          {/* Desktop links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              mr: 2,
            }}
          >
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

          {/* Mobile hamburger */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 250, p: 2, display: "flex", flexDirection: "column" }}
          role="presentation"
          onClick={() => setOpen(false)}
        >
          {pages.map((page) => (
            <List key={page.name}>
              <ListItem
                button
                component={RouterLink}
                to={page.path}
                sx={{ textDecoration: "none" }}
              >
                <ListItemText
                  primary={page.name}
                  sx={(theme) => ({
                    fontSize: 18,
                    color: theme.palette.text.primary,
                  })}
                />
              </ListItem>
            </List>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
