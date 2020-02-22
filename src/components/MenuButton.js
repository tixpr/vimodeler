import React from 'react';

export default class MenuButton extends React.Component{
	click(e){
		e.preventDefault();
		let eview = document.querySelector('li.view');
		if(eview && eview!==this.content.parentNode){
			eview.classList.remove('view');
		}
		this.content.parentNode.classList.toggle('view');
		if(this.props.on_click){
			this.props.on_click();
		}
	}
	render(){
		return (
			<button onClick={(e)=>this.click(e)} ref={(c)=>this.content=c}>
				&nbsp;<i className="fa fa-chevron-right"></i>
				&nbsp;{this.props.text}
			</button>
		);
	}
};