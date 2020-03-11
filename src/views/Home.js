import React from 'react';
import {Card} from 'primereact/card';
import {
	Link
} from "react-router-dom";

const styles = {
	margin: '10px'
};

class Home extends React.Component{
	render(){
		return (
			<div className="flex row justify-center align-center">
				<Link to="/maps" style={styles}>
					<Card>
						Abrir Mapa
					</Card>
				</Link>
				<Link to="" style={styles}>
					<Card>
						Nuevo Mapa
					</Card>
				</Link>
				<Link to="/diagrams" style={styles}>
					<Card>
						Abrir Diagrama
					</Card>
				</Link>
				<Link to="" style={styles}>
					<Card>
						Nuevo Diagrama
					</Card>
				</Link>
			</div>
		);
	}
}
export default Home;