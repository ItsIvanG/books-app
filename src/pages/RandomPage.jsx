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

  // Modal state
  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);

  // subject cycling index
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
      .catch((error) => {
        console.error("Error fetching random books:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const hasBooks = results.length > 0 || loading;

  return (
    <>
      {/* Always show main header */}
      <Box sx={{ textAlign: "center", mt: hasBooks ? 4 : 0 }}>
        <Typography variant="h3" gutterBottom>
          Discover Something New
        </Typography>
      </Box>

      {!hasBooks ? (
        // Centered button when no books yet
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSurprise}
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Loading..." : "Surprise Me"}
          </Button>
        </Box>
      ) : (
        <>
          {/* Button stays on top after loading */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              variant="contained"
              onClick={handleSurprise}
              disabled={loading}
            >
              {loading ? "Loading..." : "Surprise Me Again"}
            </Button>
          </Box>

          {/* Results header */}

          <Grid container spacing={2}>
            {(loading ? Array.from(new Array(12)) : results).map(
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
