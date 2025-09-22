import { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import BookCardSkeleton from "../components/BookCardSkeleton";
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setHasSearched(true);
    axios
      .get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&limit=24`
      )
      .then((res) => {
        const booksWithRatings = res.data.docs.map((item) => ({
          ...item,
          rating: (Math.random() * 4 + 1).toFixed(1),
        }));
        setResults(booksWithRatings);
        console.log("results", results);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ mt: 5, fontFamily: '"Inter", sans-serif' }}>
      {!hasSearched ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            Browse Books
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2, width: "60%" }}>
            <TextField
              label="Search by Title"
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "90%",
            mx: "auto",
            mb: 10,
          }}
        >
          {/* Search Bar */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, width: "95%" }}>
            <TextField
              label="Search by Title"
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Box>

          <Typography variant="h6" align="center" gutterBottom sx={{ mb: 3 }}>
            {loading ? "Searching books..." : "Search Results"}
          </Typography>
          {loading ? (
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              {Array.from(new Array(12)).map((_, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BookCardSkeleton width={190} />
                </Grid>
              ))}
            </Grid>
          ) : results.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No books found for "{query}"
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              {results.map((book, index) => (
                <Grid
                  item
                  key={book?.key || index}
                  xs={12}
                  sm={6}
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BookCard
                    title={book.title}
                    author={book.author_name?.[0] || "Unknown Author"}
                    year={book.first_publish_year}
                    coverUrl={book.cover_i}
                    rating={book.rating}
                    onClick={() => handleOpen(book)}
                    width={190}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      <BookModal open={open} handleClose={handleClose} book={selectedBook} />
    </Box>
  );
}
