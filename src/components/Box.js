import {Component} from 'react';

export default class Box extends Component{
	componentDidMount(){
		//this.box.addEventListener('dragstart',(e)=>this.dragStart(e),false);
	}
	dragStart(e){
		//console.info('drag start');
		e.dataTransfer.setData('text',this.props.data.name);
	}
	render(){
		return (
			<img ref={(c)=>this.box=c} alt="elemento" src={this.props.data.src} my-role="element" draggable="true" onDragStart={(e)=>this.dragStart(e)}/>
		);
	}
};