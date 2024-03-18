import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomeController = () => {
  const role = sessionStorage.getItem("role");
  const nav = useNavigate();

  useEffect(() => {
    if (role === "ADMIN") {
      nav("/admin/dashboard");
      return;
    }
    if (role === "DOSEN") {
      nav("/teacher/dashboard");
      return;
    }

    nav("/student/dashboard");
    return;
  }, []);

  return;
};
