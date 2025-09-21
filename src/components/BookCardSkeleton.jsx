import { Card, CardContent, Skeleton, Box } from "@mui/material";

const BookCardSkeleton = ({ width = 180 }) => {
  return (
    <Card
      sx={{
        width: {
          xs: width,
          sm: width + 20,
          md: width + 40,
        },
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <Skeleton variant="rectangular" height={200} />

      <CardContent>
        <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />

        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" width={30} height={16} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton variant="text" width={20} height={16} sx={{ mr: 0.5 }} />
            <Skeleton variant="circular" width={16} height={16} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCardSkeleton;
