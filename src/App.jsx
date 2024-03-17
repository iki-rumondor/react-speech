import { Toaster } from "react-hot-toast";
import { MasterClass } from "./components/pages/teacher/master/class/MasterClass.jsx";
import { useLoading } from "./context/LoadingContext.jsx";
import Loading from "./components/pages/Loading.jsx";
import { MasterDepartment } from "./components/pages/admin/master/department/MasterDepartment.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import SignIn from "./components/pages/SignIn.jsx";
import { Router } from "./components/Router.jsx";

export default function App() {
  const { isLoading } = useLoading();

  return (
    <>
      <Router />
      {isLoading && <Loading />}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
