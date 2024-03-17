import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserRole } from './Helpers';

export const RoleAuth = ({name}) => {
	const location = useLocation();
	const role = sessionStorage.getItem("role")
	if (role != name) {
		return (
			<Navigate
				to={"/home"}
				state={{ path: location.pathname, error: "Forbidden Page" }}
			/>
		);
	}

	return <Outlet />;
}

export const IsProdi = () => {
	const location = useLocation();

	const role = getUserRole();
	if (role != "DEPARTMENT") {
		return (
			<Navigate
				to={"/"}
				state={{ path: location.pathname, error: "Forbidden Page" }}
			/>
		);
	}

	return <Outlet />;
}
