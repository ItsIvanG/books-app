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
  Box,
  CircularProgress,
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
      <DialogTitle
        variant="h4"
        sx={{
          fontStyle: "italic",
          color: "text.primary",
        }}
      >
        {book.title}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {book.cover_i ? (
              <Box
                component="img"
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                sx={{
                  width: 180,
                  height: "auto",
                  borderRadius: 2,
                  display: "block",
                  mx: "auto",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 180,
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  mx: "auto",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Grid>

          <Grid item xs={8}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontFamily: "Inter, sans-serif" }}
            >
              Author: {book.author || "Unknown"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              sx={{ fontFamily: "Inter, sans-serif" }}
            >
              First Published: {book.year || "N/A"}
            </Typography>
            <Rating
              name="read-only"
              value={book.rating || 0}
              precision={0.1}
              readOnly
            />
            <Typography
              variant="body1"
              sx={{ mt: 2, fontFamily: "Inter, sans-serif" }}
            >
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
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
