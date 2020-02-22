import React from 'react';
import Modelayer from '../Modelayer';

export default class Board extends React.Component{
	constructor(props){
		super(props);
		this.modelayer = null;
		window.__board = this;
	}
	componentDidMount(){
		if(this.cvs.getContext){
			this.modelayer = new Modelayer(this.cvs);
		}else{
			console.error("");
		}
	}
	canvasResize(dimension){
		//console.info('resize');
		//console.info(dimension);
		if(this.cvs.clientWidth<dimension.width){
			this.cvs.setAttribute('width', dimension.width+'px');
		}
		if(this.cvs.clientHeight<dimension.height){
			this.cvs.setAttribute('height', dimension.height+'px');
		}
		this.model.draw();
	}
	addProject(name=''){
		console.info('nuevo proyecto');
	}
	addMap(name=''){
		this.modelayer.addProcessMap(name);
		window.__toolbox.setMode("map");
	}
	addDiagram(name=''){
		this.modelayer.addProcessMap(name);
		window.__toolbox.setMode("diagram");
	}
	render(){
		return (
			<div id="board" ref={(c)=>this.board=c} className="auto-flex">
				<canvas ref={(c)=>this.cvs=c} width="0px" height="0px">
				</canvas>
			</div>
		);
	}
};