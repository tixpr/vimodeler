import React from 'react';

export default class Property extends React.Component{
	constructor(props) {
		super(props);
		window.__property = this;
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
		window.__menu.check_property.unchecked();
	}
	render(){
		return (
			<div id="property" ref={(c)=>this.content=c}>
				<div className="flex column">
					<div className="close">
						<span>
							Propiedades
						</span>
						<button onClick={()=>this.closeClick()}>
							<i className="fa fa-times"></i>
						</button>
					</div>
					<div className="content-property auto-flex">
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
					</div>
				</div>
			</div>
		);
	}
};