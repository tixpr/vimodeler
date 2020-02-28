import React from 'react';

export default class Box extends React.Component{
	dragStart(e){
		//console.info('drag start');
		e.dataTransfer.setData('text',this.props.boxName);
	}
	render(){
		/*
		return (
			<img ref={(c)=>this.box=c} alt="elemento" src={this.props.data.src} my-role="element" draggable="true" onDragStart={(e)=>this.dragStart(e)}/>
		);
		*/
		return (
			<div className="inline" draggable="true" onDragStart={(e)=>this.dragStart(e)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" draggable="true">
					{this.props.element}
				</svg>
			</div>
		);
	}
};