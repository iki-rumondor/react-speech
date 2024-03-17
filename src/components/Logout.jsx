import { Navigate } from "react-router-dom";

export default function Logout() {
	sessionStorage.clear();
	return <Navigate to="/signin" replace />;
}
