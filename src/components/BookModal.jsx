import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
  Rating,
  Skeleton,
} from "@mui/material";
import axios from "axios";

export default function BookModal({ open, handleClose, book }) {
  const [description, setDescription] = useState("");
  const [loadingDesc, setLoadingDesc] = useState(false);

  useEffect(() => {
    if (book?.key) {
      setLoadingDesc(true);
      axios
        .get(`https://openlibrary.org${book.key}.json`)
        .then((res) => {
          const desc =
            typeof res.data.description === "string"
              ? res.data.description
              : res.data.description?.value;
          setDescription(desc || "No description available.");
        })
        .catch(() => {
          setDescription("No description available.");
        })
        .finally(() => {
          setLoadingDesc(false);
        });
    }
  }, [book]);

  if (!book) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150x220?text=No+Cover"
              }
              alt={book.title}
              style={{
                width: "100%",
                borderRadius: 8,
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1" gutterBottom>
              Author: {book.author || "Unknown"}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              First Published: {book.year || "N/A"}
            </Typography>
            <Rating
              name="read-only"
              value={book.rating || 0}
              precision={0.1}
              readOnly
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {loadingDesc ? (
                <>
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                  <Skeleton width="90%" />
                </>
              ) : (
                description
              )}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
