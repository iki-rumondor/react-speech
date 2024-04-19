import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import { Divider, Fab, Grid, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useUtils } from "../../../context/UtilsContext";
import { useLoading } from "../../../context/LoadingContext";
import { fetchAPI, postFile } from "../../../utils/Fetching";
import { BookCard } from "../../layouts/cards/BookCard";
import { AddBookForm } from "../../layouts/forms/AddBookForm";
import { DetailStudentClass } from "./DetailStudentClass";

export const StudentBooks = () => {
  const { classSelected } = useUtils();
  const { isSuccess, setIsLoading } = useLoading();

  const [data, setData] = useState(null);

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/books/classes/${classSelected}`);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (classSelected) {
      handleLoad();
    }
  }, [classSelected, isSuccess]);

  return (
    <DetailStudentClass title={"List Buku Pembelajaran"}>
      <Typography marginTop={4} variant="h5" gutterBottom>
        List Buku
      </Typography>
      <Divider sx={{ marginY: 2 }} />

      <Grid container spacing={2} marginBottom={3}>
        {data &&
          data.map((video) => (
            <Grid key={video.uuid} item xs={12} md={6} lg={4}>
              <BookCard book={video} />
            </Grid>
          ))}
      </Grid>
    </DetailStudentClass>
  );
};
