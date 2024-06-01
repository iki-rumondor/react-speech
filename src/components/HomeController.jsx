import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomeController = () => {
  const role = sessionStorage.getItem("role");
  const nav = useNavigate();

  useEffect(() => {
    if (role === "ADMIN") {
      window.location.href = "/admin/dashboard";
      return;
    }
    if (role === "DOSEN") {
      window.location.href = "/teacher/dashboard";
      return;
    }

    window.location.href = "/student/dashboard";
    return;
  }, []);

  return;
};
