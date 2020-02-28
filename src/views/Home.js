import React from 'react';
import {
	Link
} from "react-router-dom";


class Home extends React.Component{
	render(){
		return (
			<div className="flex row justify-center align-center">
				<Link to="/maps">
					Abrir Mapa
				</Link>
				<Link to="">
					Nuevo Mapa
				</Link>
				<Link to="/diagrams">
					Abrir Diagrama
				</Link>
				<Link to="">
					Nuevo Diagrama
				</Link>
			</div>
		);
	}
}
export default Home;