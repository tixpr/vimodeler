import React from 'react';

export default class MapModeler extends React.Component{
	render(){
		return (
			<canvas ref={(c) => this.this.cvs = c} width="0" height="0">
			</canvas>
		);
	}
};