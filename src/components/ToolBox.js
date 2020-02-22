import React from 'react';
import Box from './Box';
let map_data = [
	{
		'src':'/img/process.png',
		'name':'Process'
	},
	{
		'src':'/img/flow.png',
		'name':'Flow'
	},
	{
		'src':'/img/label.png',
		'name':'Label'
	}
],
diagram_data = [
	{
		'src':'/img/task.png',
		'name':'Task'
	},
	{
		'src':'/img/start.png',
		'name':'StartEvent'
	},
	{
		'src':'/img/intermediate.png',
		'name':'IntermediateEvent'
	},
	{
		'src':'/img/end.png',
		'name':'EndEvent'
	},
	{
		'src':'/img/flow.png',
		'name':'Sequence'
	},
	{
		'src':'/img/gateway.png',
		'name':'Gateway'
	}
];
export default class ToolBox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		window.__toolbox = this;
	}
	setMode(mode){
		switch(mode){
			case 'diagram': this.setState({data:diagram_data});break;
			case 'map': this.setState({data:map_data});break;
			default:break;
		}
	}
	componentDidMount(){
		this.content.classList.add('show');
	}
	toggle(){
		this.content.classList.toggle('show');
	}
	show(){
		this.content.classList.add('show');
	}
	hidden(){
		this.content.classList.remove('show');
	}
	closeClick(){
		this.content.classList.remove('show');
		window.__menu.check_toolbox.unchecked();
	}
	render() {
		let boxs = this.state.data.map(function(box){
			return (
				<Box data={box} key={JSON.stringify(box)}/>
			);
		});
		return (
			<div id="toolbox" ref={(c)=>this.content=c}>
				<div className="flex column">
					<div className="close">
						<button onClick={()=>this.closeClick()}>
							<i className="fa fa-times"></i>
						</button>
					</div>
					<div className="auto-flex content-toolbox">
						{boxs}
					</div>
				</div>
			</div>
		);
	}
};