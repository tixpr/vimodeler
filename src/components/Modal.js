import {Component} from 'react';
import ModalInput from './ModalInput';

export default class Modal extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
	}
	show(){
		this.base.classList.add('show');
	}
	hide(){
		this.base.classList.remove('show');
	}
	accept(e){
		console.info('acceptando la creación');
	}
	cancel(e){
		console.info('cancelando la creación');
	}
	render(){
		return (
			<div id="base_modal" ref={(c)=>this.base=c}>
				<ModalInput ref={(c)=>this.input_name=c} accept={(e)=>this.accept(e)} cancel={(e)=>this.cancel(e)}/>
			</div>
		);
	}
};