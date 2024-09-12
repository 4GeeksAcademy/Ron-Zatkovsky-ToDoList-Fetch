import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";

//create your first component
const Home = () => {
	return (
		<div className="container-fluid d-flex justify-content-center">
			<div className="row">
				<ToDoList/>
			</div>
		</div>
	);
};

export default Home;
