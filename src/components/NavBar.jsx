import { Box, Link } from "@mui/material";

export default function NavBar() {
  const pages = [
    { name: "Trending", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Random", path: "/random" },
    { name: "About", path: "/about" },
  ];

  return (
    <Box
      className="navbar"
      sx={{
        padding: 2,
        backgroundColor: "#e9e9e9ff",
        color: "white",
        display: "flex",
        gap: 2,
      }}
    >
      {pages.map((page) => (
        <Link
          key={page.name}
          href={page.path}
          underline="none"
          color="black"
          sx={{ fontSize: 18, fontWeight: "bold" }}
        >
          {page.name}
        </Link>
      ))}
    </Box>
  );
}
