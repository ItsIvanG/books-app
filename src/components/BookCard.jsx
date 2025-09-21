import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from "@mui/material";

const BookCard = ({ title, author, year, coverUrl, rating, onClick, width = 180 }) => {
  return (
    <Card
      sx={{
        width: {
          xs: width, // mobile
          sm: width + 20, // small screens
          md: width + 40, // medium screens
        },
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="200"
          image={
            coverUrl
              ? `https://covers.openlibrary.org/b/id/${coverUrl}-M.jpg`
              : "https://via.placeholder.com/150x220?text=No+Cover"
          }
          alt={title}
        />
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
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ fontFamily: '"Inter", sans-serif' }}
          >
            {year || "N/A"}
          </Typography>
          {rating}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
