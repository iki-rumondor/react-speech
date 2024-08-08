import axios from "axios";

const accessToken = sessionStorage.getItem("token");

const baseAPIUrl = "http://localhost:8080/api";
// const baseAPIUrl = "http://103.26.13.166:8080/api";

export const postFile = async (endpoint, method, data) => {
  try {
    const response = await axios({
      method,
      url: `${baseAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getFile = async (endpoint) => {
  
  try {
    const response = await axios({
      method: "GET",
      url: `${baseAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(response.data);
    window.open(url, "_blank");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const postAPI = async (endpoint, method, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${baseAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message ? error.response.data : error;
  }
};

export const deleteAPI = async (endpoint) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${baseAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message ? error.response.data : error;
  }
};

export const fetchAPI = async (endpoint) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${baseAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message ? error.response.data : error;
  }
};

export const pdfAPI = async (endpoint, data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${baseAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/pdf",
      },
      responseType: "blob",
      data: data,
    });
    const url = window.URL.createObjectURL(response.data);
    window.open(url, "_blank");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
