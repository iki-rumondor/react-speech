import React from "react";
import '../../assets/css/spinner.css'
import { CircularProgress } from "@mui/material";


export default function Loading() {
	return (
		<div className="container-spinner">

		<div className="spinner-container">
				<CircularProgress sx={{ color:"#ffff" }}/>
			{/* <div className="spinner-border" role="status">
			</div> */}
		</div>
		</div>
	);
}
