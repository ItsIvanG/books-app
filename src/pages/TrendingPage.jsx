import {
  Grid,
  Typography,
  Card,
  CardContent,
  Skeleton,
  Container,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import BookCard from "../components/BookCard";
import { useState } from "react";
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
      .catch((error) => {
        console.error("Error fetching books:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //modal

  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Typography>Trending Books Today</Typography>
      <Grid container spacing={2}>
        {(loading ? Array.from(new Array(12)) : books).map((book, index) => (
          <Grid
            item
            key={book?.key || index}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: "flex" }}
          >
            {loading ? (
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Skeleton variant="rectangular" width="100%" height={140} />
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
        ))}
      </Grid>

      <Typography>Popular Fiction</Typography>
      <Grid container spacing={2}>
        {(loading ? Array.from(new Array(6)) : fiction).map((book, index) => (
          <Grid item key={book?.key || index} size={3} sx={{ display: "flex" }}>
            {loading ? (
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Skeleton variant="rectangular" width="100%" height={140} />
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
        ))}
      </Grid>

      <Typography>Science & Technology</Typography>
      <Grid container spacing={2}>
        {(loading ? Array.from(new Array(6)) : science).map((book, index) => (
          <Grid item key={book?.key || index} size={3} sx={{ display: "flex" }}>
            {loading ? (
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Skeleton variant="rectangular" width="100%" height={140} />
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
        ))}
      </Grid>

      <Typography>History & Biography</Typography>
      <Grid container spacing={2}>
        {(loading ? Array.from(new Array(6)) : history).map((book, index) => (
          <Grid item key={book?.key || index} size={3} sx={{ display: "flex" }}>
            {loading ? (
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Skeleton variant="rectangular" width="100%" height={140} />
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
        ))}
      </Grid>
      <BookModal open={open} handleClose={handleClose} book={selectedBook} />
    </Container>
  );
}
