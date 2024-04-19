import { useParams } from "react-router-dom";
import { useLoading } from "../../../context/LoadingContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getBackendUrl } from "../../../utils/Helpers";
import axios from "axios";

export const BookView = () => {
  const { file_name } = useParams();
  const { setIsLoading } = useLoading();
  const backendUrl = getBackendUrl();
  

  useEffect(() => {
    handleLoad();
  }, []);

  return <></>;
};
