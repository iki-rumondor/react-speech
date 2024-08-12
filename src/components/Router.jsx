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
import { VideoPages } from "./pages/video/Index";
import { ListVideos } from "./pages/teacher/ListVideos";
import { ListBooks } from "./pages/teacher/ListBooks";
import { BookView } from "./pages/book/Index";
import { StudentVideos } from "./pages/student/ListVideos";
import { StudentBooks } from "./pages/student/ListBooks";
import { ListNotes } from "./pages/teacher/ListNotes";
import { StudentNotes } from "./pages/student/ListNotes";
import { TeacherDashboard } from "./pages/teacher/Dashboard";
import { StudentDashboard } from "./pages/student/Dashboard";
import { Classes } from "./pages/student/Classes";
import { StudentClassReport } from "./pages/admin/reports/StudentClassReport";
import { Materials } from "./pages/teacher/Materials";
import { VideoByMaterial } from "./pages/video/ByMaterial";
import { MasterTeacher } from "./pages/admin/master/MasterTeacher";
import { MasterStudent } from "./pages/admin/master/MasterStudent";
import { StudentMaterials } from "./pages/student/Materials";
import { AssignmentTeacher } from "./pages/teacher/Assignment";
import { AssignmentStudent } from "./pages/student/Assignment";
import { AdminMasterClass } from "./pages/admin/master/classes/Index";
import { MasterSubjects } from "./pages/admin/master/subjects/Index";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<RoleAuth name={"ADMIN"} />}>
            <Route path="/admin/dashboard" Component={AdminDashboard} />
            <Route path="/admin/master/prodi" element={<MasterDepartment />} />
            <Route path="/admin/master/teacher" element={<MasterTeacher />} />
            <Route path="/admin/master/students" element={<MasterStudent />} />
            <Route path="/admin/master/classes" element={<AdminMasterClass />} />
            <Route path="/admin/master/subjects" element={<MasterSubjects />} />
            <Route path="/admin/verify-teachers" element={<VerifyTeachers />} />
            <Route path="/admin/reports/student" element={<StudentClassReport />} />
          </Route>
          <Route element={<RoleAuth name={"DOSEN"} />}>
            <Route path="/teacher/dashboard" Component={TeacherDashboard} />
            <Route path="/teacher/class" element={<MasterClass />} />
            <Route path="/teacher/class/request" element={<RequestClass />} />
            <Route path="/teacher/class/videos" element={<ListVideos />} />
            <Route path="/teacher/class/books" element={<ListBooks />} />
            <Route path="/teacher/class/notes" element={<ListNotes />} />
            <Route path="/teacher/materials" element={<Materials />} />
            <Route path="/teacher/assignments" element={<AssignmentTeacher />} />
          </Route>
          <Route element={<RoleAuth name={"MAHASISWA"} />}>
            <Route path="/student/dashboard" Component={StudentDashboard} />
            <Route path="/classes" Component={Classes} />
            <Route
              path="/student/request-classes"
              element={<RequestClassStudent />}
            />
            <Route path="/student/videos" element={<StudentVideos />} />
            <Route path="/student/books" element={<StudentBooks />} />
            <Route path="/student/notes" element={<StudentNotes />} />
            <Route path="/student/materials" element={<StudentMaterials />} />
            <Route path="/student/assignments" element={<AssignmentStudent />} />
          </Route>
          <Route path="/books/:file_name" element={<BookView />} />
          <Route path="/videos/:uuid" element={<VideoPages />} />
          <Route path="/videos/materials/:uuid" element={<VideoByMaterial />} />
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
