import React from 'react';

export default class FileElement extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			model: null,
			childrens: []
		};
	}
	render(){
		let sub = null;
		switch(this.props.type){
			case 'map':{
				sub = (
					<FileElement type />
				);
			};break;
			case 'diagram':{};break;
			case 'project':{};break;
		}
		return (
			<div className="file-element">
				<span>
					{this.props.name}
				</span>
			</div>
		);
	}
};