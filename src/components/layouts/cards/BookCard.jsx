import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBackendUrl } from "../../../utils/Helpers";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import axios from "axios";
import { MoreVert } from "@mui/icons-material";
import moment from "moment";

export const BookCard = ({ book, setAnchorEl, setSelectID }) => {
  console.log(book);
  const { setIsLoading } = useLoading();
  const backendUrl = getBackendUrl();
  const role = sessionStorage.getItem("role");
  const [usingPdf, setUsingPdf] = useState({
    url: `${backendUrl}/file/books/${book?.file_name}`,
    thumbnail: "/src/assets/img/bg-book.jpg",
  });

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "GET",
        url: usingPdf.url,
        // url: `${backendUrl}/file/books/${book?.file_name}`,
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

  useEffect(() => {
    if (book.flipbook?.url) {
      setUsingPdf({
        url: book.flipbook.url,
        thumbnail: book.flipbook.thumbnail,
      });
    }
  }, []);

  return (
    <>
      <Card>
        {role == "DOSEN" && (
          <CardHeader
            avatar={<Avatar />}
            title={book.teacher}
            subheader={moment.unix(book.created_at / 1000).fromNow()}
            action={
              <>
                <IconButton
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setSelectID(book.uuid);
                  }}
                >
                  <MoreVert />
                </IconButton>
              </>
            }
          />
        )}
        <CardActionArea onClick={handleClick}>
          <CardMedia
            sx={{ height: 140 }}
            image={usingPdf.thumbnail}
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
