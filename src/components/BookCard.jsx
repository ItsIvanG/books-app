import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Star } from "@mui/icons-material";

const BookCard = ({
  title,
  author,
  year,
  coverUrl,
  rating,
  onClick,
  width = 180,
  rank,
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        width: {
          xs: width,
          sm: width + 20,
          md: width + 40,
        },
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <CardActionArea onClick={onClick}>
        {rank && (
          <Chip
            label={`#${rank}`}
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              fontWeight: "bold",
            }}
          />
        )}

        {coverUrl ? (
          <CardMedia
            component="img"
            height="200"
            image={`https://covers.openlibrary.org/b/id/${coverUrl}-M.jpg`}
            alt={title}
          />
        ) : (
          <Box
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.100",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <CardContent>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ fontFamily: '"Inter", sans-serif' }}
          >
            {author}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            >
              {year || "N/A"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 0.5, fontFamily: '"Inter", sans-serif' }}>
                {rating}
              </Typography>
              <Star fontSize="small" sx={{ color: "gold" }} />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
