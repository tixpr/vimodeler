import React from 'react';
import ToolBox from './components/ToolBox';
import Board from './components/Board';
import Files from './components/Files';
import Property from './components/Property';
import Menu from './components/Menu';

export default class VModel extends React.Component{
	constructor(props){
		super(props);
		window.__vmodel = this;
	}
	componentDidMount(){
		this.navigator.board = this.board;
		this.board.navigator = this.navigator;
		this.board.parent = this;
		this.navigator.parent = this;
		//this.newDiagram();
	}
	newMap(){
		this.board.addMap('Mapa');
	}
	newDiagram(){
		this.board.addDiagram('diagrama');
	}
	newProject(){
		this.board.addProject('diagrama');
		//this.modal.setState({mode:'project'});
		//this.modal.show();
	}
	render(){
		return (
			<div className="flex column">
				<Menu ref={(c)=>this.navigator=c}/>
				<div className="auto-flex">
					<div className="flex row">
						<ToolBox />
						<div className="auto-flex">
							<div className="flex column">
								<Board ref={(c)=>this.board=c}/>
								<Property />
							</div>
						</div>
						<Files />
					</div>
				</div>
			</div>
		);
	}
};
