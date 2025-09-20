import { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Skeleton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);

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
      })
      .catch((error) => {
        console.error("Error searching books:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const hasSearched = results.length > 0 || loading;
  return (
    <>
      {/* If user hasn't searched yet */}
      {!hasSearched ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh", // full height center
          }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            Browse Books
          </Typography>

          {/* Search Bar under header */}
          <Box sx={{ display: "flex", gap: 2, mt: 3, width: "60%" }}>
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
        <>
          {/* Search Bar (always on top once searched) */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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

          {/* Results header */}
          <Typography variant="h6" align="center" gutterBottom>
            {loading ? "Searching books..." : "Search Results"}
          </Typography>

          <Grid container spacing={2}>
            {(loading ? Array.from(new Array(24)) : results).map(
              (book, index) => (
                <Grid
                  item
                  key={book?.key || index}
                  size={3}
                  sx={{ display: "flex" }}
                >
                  {loading ? (
                    <Card sx={{ width: "100%" }}>
                      <CardContent>
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={140}
                        />
                        <Skeleton variant="text" sx={{ mt: 2 }} />
                        <Skeleton variant="text" width="60%" />
                      </CardContent>
                    </Card>
                  ) : (
                    <BookCard
                      title={book.title}
                      author={book.author_name?.[0] || "Unknown Author"}
                      year={book.first_publish_year}
                      coverUrl={book.cover_i}
                      rating={book.rating}
                      onClick={() => handleOpen(book)}
                    />
                  )}
                </Grid>
              )
            )}
          </Grid>
        </>
      )}

      <BookModal open={open} handleClose={handleClose} book={selectedBook} />
    </>
  );
}
