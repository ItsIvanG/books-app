import { Grid, Typography, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookCardSkeleton from "../components/BookCardSkeleton";
import BookModal from "../components/BookModal";

export default function TrendingPage() {
  const [books, setBooks] = useState([]);
  const [fiction, setFiction] = useState([]);
  const [science, setScience] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingBooks = () =>
    axios.get("https://openlibrary.org/trending/daily.json?limit=12");
  const fetchTrendingFiction = () =>
    axios.get("https://openlibrary.org/search.json?limit=6&subject=fiction");
  const fetchTrendingScience = () =>
    axios.get("https://openlibrary.org/search.json?limit=6&subject=science");
  const fetchTrendingHistory = () =>
    axios.get("https://openlibrary.org/search.json?limit=6&subject=history");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchTrendingBooks(),
      fetchTrendingFiction(),
      fetchTrendingScience(),
      fetchTrendingHistory(),
    ])
      .then(([booksRes, fictionRes, scienceRes, historyRes]) => {
        const addRating = (items) =>
          items.map((item) => ({
            ...item,
            rating: (Math.random() * 4 + 1).toFixed(1),
          }));
        setBooks(addRating(booksRes.data.works));
        setFiction(addRating(fictionRes.data.docs));
        setScience(addRating(scienceRes.data.docs));
        setHistory(addRating(historyRes.data.docs));
      })
      .catch((error) => console.error("Error fetching books:", error))
      .finally(() => setLoading(false));
  }, []);

  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const renderBookGrid = (data, loadingCount, withRank = false) =>
    (loading ? Array.from(new Array(loadingCount)) : data).map(
      (book, index) => (
        <Grid
          item
          key={book?.key || index}
          xs={12}
          sm={6}
          md={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {loading ? (
            <BookCardSkeleton width={180} />
          ) : (
            <BookCard
              title={book.title}
              author={book.author_name?.[0] || "Unknown Author"}
              year={book.first_publish_year}
              coverUrl={book.cover_i}
              rating={book.rating}
              rank={withRank ? index + 1 : null}
              onClick={() =>
                handleOpen({ ...book, rank: withRank ? index + 1 : null })
              }
              width={180}
            />
          )}
        </Grid>
      )
    );

  return (
    <Container
      maxWidth={false}
      sx={{
        mt: 5,
        fontFamily: '"Inter", sans-serif',
        px: "5%",
        maxWidth: "90%",
        mb: 10,
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: 500, mb: 5, ml: 5 }}
      >
        Trending Books Today
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {renderBookGrid(books, 12, true)}
      </Grid>

      <Typography
        variant="h2"
        gutterBottom
        sx={{ mt: 6, fontWeight: 500, mb: 5, ml: 5 }}
      >
        Popular Fiction
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {renderBookGrid(fiction, 6)}
      </Grid>

      <Typography
        variant="h2"
        gutterBottom
        sx={{ mt: 6, fontWeight: 500, mb: 5, ml: 5 }}
      >
        Science & Technology
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {renderBookGrid(science, 6)}
      </Grid>

      <Typography
        variant="h2"
        gutterBottom
        sx={{ mt: 6, fontWeight: 500, mb: 5, ml: 5 }}
      >
        History & Biography
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {renderBookGrid(history, 6)}
      </Grid>

      <BookModal open={open} handleClose={handleClose} book={selectedBook} />
    </Container>
  );
}
