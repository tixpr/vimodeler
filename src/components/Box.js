import React from 'react';

/*
export default class Box extends React.Component{
	dragStart(e){
		e.dataTransfer.setData('text',this.props.boxName);
	}
	render(){
		return (
			<div style={{margin: "10px"}} draggable="true" onDragStart={(e)=>this.dragStart(e)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" draggable="true">
					{this.props.element}
				</svg>
			</div>
		);
	}
};
*/

export default function Box(props){
	const {boxName, element, ...extras} = props;
	const dragStart = (e)=>{
		e.dataTransfer.setData('text',boxName);
	}
	return (
		<div style={{margin: "10px"}} draggable="true" onDragStart={dragStart} {...extras}>
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" draggable="true">
				{element}
			</svg>
		</div>
	);
}