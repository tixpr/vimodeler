import React from 'react';

export default class PanelButton extends React.Component{
	click(e){
		e.preventDefault();
		this.content.parentNode.parentNode.classList.toggle('view');
		if(this.props.on_click){
			this.props.on_click();
		}
	}
	render(){
		return (
			<button ref={(c)=>this.content=c} className="panel_button" onClick={(e)=>this.click(e)}>
				<i className={this.props.cn}></i>
				<br/>
				{this.props.text}
			</button>
		);
	}
};