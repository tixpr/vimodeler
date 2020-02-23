import {Component} from 'react';

export default class PanelCheckbox extends Component{
	changeController(){
		//this.content.parentNode.parentNode.classList.toggle('view');
		if(this.props.on_change){
			this.props.on_change();
		}
	}
	unchecked(){
		this.input.checked = false;
	}
	checked(){
		this.input.checked = true;
	}
	toggle(){
		this.input.checked = !this.input.checked;
	}
	componentDidMount(){
		if(this.props.checked && this.props.checked === "true"){
			this.input.checked = true;
		}
	}
	render(){
		return (
			<div className="form-controller" ref={(c)=>this.content=c}>
				<input ref={(c)=>this.input=c} type="checkbox" id={this.props.pk} onChange={()=>this.changeController()}/>
				<label htmlFor={this.props.pk}>
					{this.props.text}
				</label>
			</div>
		);
	}
};