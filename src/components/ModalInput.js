import {Component} from 'react';
import InputForm from './InputForm';

export default class ModalInput extends Component{
	constructor(props){
		super(props);
	}
	accept(){
		console.info('submit en el modal');
	}
	cancel(){
		console.info('cancelando creación');
	}
	render(){
		return (
			<form className="modal_form">
				<InputForm text="Ingrese el nombre" type="text" for="im-name" ref={(c)=>this.input_name=c} cancel={()=>this.cancel()}/>
				<button onClick={(e)=>this.accept()} type="button" className="btn btn-one btn-left">
					<i className="fa fa-check fa-2x"></i>
				</button>
				<button onClick={(e)=>this.cancel()} type="button" className="btn btn-five btn-right">
					<i className="fa fa-times fa-2x"></i>
				</button>
			</form>
		);
	}
};