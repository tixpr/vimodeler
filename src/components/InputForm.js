import React from 'react';

export default class InputForm extends React.Component{
	constructor(props){
		super(props);
		this.type = props.type;
	}
	focus_event(e) {
		//console.info(this.label);
		let cl = this.label.classList;
		//console.info(cl);
		if(!cl.contains('focus')){
			cl.add('focus');
		}
	}
	blur_event(e){
		//console.info('blur event');
		let cl = this.label.classList;
		if(cl.contains("focus") && this.input.value == ""){
			//console.info('eliminando el focus class');
			cl.remove('focus');
		}
	}
	onChange(e){
		//console.info('change event');
		if(this.type!="number"){
			this.value = this.input.value;
		}else{
			this.value = this.input.valueAsNumber;
		}
	}
	getValue(){
		return this.value;
	}
	onkeyup(e){
		//console.info(e);
		//console.info(e.keyCode);
		//if(e.keyCode==27){
			//this.props.onCancel();
		//}
	}
	render (){
		return (
			<div className="form-group">
				<input ref={(c)=>this.input = c} type={this.props.type} id={this.props.for} onFocus={(e)=>this.focus_event(e)} onBlur={(e)=>this.blur_event(e)} onChange={(e)=>this.onChange(e)} onKeyUp={(e)=>this.onkeyup(e)}/>
				<label htmlFor={this.props.for} ref={(c)=>this.label = c} className={this.props.addclass}>
					{this.props.text}
				</label>
			</div>
		);
	}
};