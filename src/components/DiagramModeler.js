import React from 'react';

export default class DiagramModeler extends React.Component{
	render(){
		return (
			<canvas ref={(c) => this.cvs = c} width="0" height="0">
			</canvas>
		);
	}
};