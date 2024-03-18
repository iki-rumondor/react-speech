import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { RequireLogout } from "../utils/RequireLogout";
import { RequireAuth } from "../utils/RequireAuth";
import { RoleAuth } from "../utils/Authorization";
import Logout from "./Logout";
import { HomeController } from "./HomeController";
import { MasterDepartment } from "./pages/admin/master/department/MasterDepartment";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { VerifyTeachers } from "./pages/admin/process/VerifyTeacher";
import { MasterClass } from "./pages/teacher/master/class/MasterClass";
import { Home } from "./pages/landing/Home";
import { RequestClassStudent } from "./pages/student/RequestClassStudent";
import { RequestClass } from "./pages/teacher/RequestClass";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<RoleAuth name={"ADMIN"} />}>
            <Route path="/admin/dashboard" Component={AdminDashboard} />
            <Route path="/admin/master/prodi" element={<MasterDepartment />} />
            <Route path="/admin/verify-teachers" element={<VerifyTeachers />} />
          </Route>
          <Route element={<RoleAuth name={"DOSEN"} />}>
            <Route path="/teacher/dashboard" Component={AdminDashboard} />
            <Route path="/teacher/class" element={<MasterClass />} />
            <Route path="/teacher/class/request" element={<RequestClass />} />
          </Route>
          <Route element={<RoleAuth name={"MAHASISWA"} />}>
            <Route path="/student/dashboard" Component={AdminDashboard} />
            <Route path="/student/request-classes" element={<RequestClassStudent />} />
          </Route>
          <Route path="/home" element={<HomeController />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route element={<RequireLogout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/master/department" element={<MasterDepartment />} />
        </Route>
        <Route path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};
