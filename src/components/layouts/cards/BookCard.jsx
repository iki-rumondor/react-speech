import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { getBackendUrl } from "../../../utils/Helpers";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import axios from "axios";

export const BookCard = ({ book }) => {
  const { setIsLoading } = useLoading();
  const backendUrl = getBackendUrl();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: `${backendUrl}/file/books/${book?.file_name}`,
        headers: {
          "Content-Type": "application/pdf",
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(response.data);
      window.open(url, "_blank");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardActionArea
          // component={Link}
          // to={`/books/${book.file_name}`}
          onClick={handleClick}
          // target="_blank"
        >
          <CardMedia
            sx={{ height: 140 }}
            image={"/src/assets/img/bg-book.jpg"}
            title={book?.title}
          />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {book?.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {book?.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
