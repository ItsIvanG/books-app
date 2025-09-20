import { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Skeleton,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

const SUBJECTS = [
  "fiction",
  "science",
  "history",
  "mystery",
  "romance",
  "fantasy",
  "biography",
  "adventure",
  "thriller",
  "comedy",
  "drama",
  "poetry",
];

export default function RandomPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [subjectIndex, setSubjectIndex] = useState(0);

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSurprise = () => {
    setLoading(true);
    const subject = SUBJECTS[subjectIndex];
    setSubjectIndex((prev) => (prev + 1) % SUBJECTS.length);

    axios
      .get(`https://openlibrary.org/search.json?subject=${subject}&limit=12`)
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

  const hasBooks = results.length > 0 || loading;

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
    <Box sx={{ mt: 5, fontFamily: '"Inter", sans-serif', mb: 10 }}>
      <Box
        sx={{
          maxWidth: "80%", // same as navbar
          mx: "auto",
          textAlign: "center",
        }}
      >
        {!hasBooks ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "70vh",
            }}
          >
            <Typography variant="h3" gutterBottom>
              Discover Something New
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Inter", sans-serif',
                color: "text.secondary",
                textAlign: "center",
                maxWidth: 800,
                mb: 4,
              }}
            >
              Click the button below to get a random selection of books from
              various genres.
            </Typography>
            <Button
              variant="contained"
              onClick={handleSurprise}
              disabled={loading}
            >
              {loading ? "Loading..." : "Surprise Me"}
            </Button>
          </Box>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={handleSurprise}
              disabled={loading}
              sx={{ mb: 3 }}
            >
              {loading ? "Loading..." : "Surprise Me Again"}
            </Button>

            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              {renderBookGrid(results, 12)}
            </Grid>
          </>
        )}
      </Box>

      <BookModal open={open} handleClose={handleClose} book={selectedBook} />
    </Box>
  );
}
