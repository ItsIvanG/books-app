import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from "@mui/material";

const BookCard = ({ title, author, year, coverUrl, rating, onClick }) => {
  return (
    <Card sx={{ width: "100%" }}>
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
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" noWrap>
            {author}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {year || "N/A"}
          </Typography>
          {rating}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
