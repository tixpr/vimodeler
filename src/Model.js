import React from 'react';
import Modelayer from './modelayer/Modelayer';

export default class Model extends React.Component{
	componentDidMount(){
		this.name = this.props.model.name;
		this.modelayer = new Modelayer(this.cvs,this.props.mode,this.props.model);
	}
	render(){
		return (
			<canvas ref={(c)=>this.cvs=c} width="0" height="0" ></canvas>
		);
	}
};