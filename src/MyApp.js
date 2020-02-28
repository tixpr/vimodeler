import React from 'react';
import {
	Switch,
	Route
} from "react-router-dom";
import Home from './views/Home';
import Maps from './views/Maps';
import MyMap from './views/MyMap';
import Diagrams from './views/Diagrams';
import Diagram from './views/Diagram';
import NotAllowed from './views/NotAllowed';



export default function App() {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/maps" component={Maps} />
			<Route exact path="/maps/:id" component={MyMap}/>
			<Route exact path="/diagrams" component={Diagrams} />
			<Route exact path="/diagrams/:id" component={Diagram}/>
			<Route component={NotAllowed}/>
		</Switch>
	);
};