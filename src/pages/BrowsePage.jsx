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
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const hasSearched = results.length > 0 || loading;

  const renderBookGrid = (data, count) =>
    (loading ? Array.from(new Array(count)) : data).map((book, index) => (
      <Grid
        item
        key={book?.key || index}
        xs={12}
        sm={6}
        md={2} // 6 per row
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {loading ? (
          <Card sx={{ width: 190, height: 320 }}>
            <Skeleton variant="rectangular" width="100%" height={180} />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <div>
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </div>
              <Skeleton variant="text" width="40%" />
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
            width={190}
          />
        )}
      </Grid>
    ));

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "80%", // same as navbar
            mx: "auto",
          }}
        >
          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              width: "96%",
            }}
          >
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

          <Typography variant="h6" align="center" gutterBottom sx={{ mb: 3 }} >
            {loading ? "Searching books..." : "Search Results"}
          </Typography>

          {/* Results Grid */}
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {renderBookGrid(results, 24)}
          </Grid>
        </Box>
      )}

      <BookModal open={open} handleClose={handleClose} book={selectedBook} />
    </Box>
  );
}
