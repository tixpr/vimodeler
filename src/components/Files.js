import {Component} from 'react';

export default class Files extends Component{
	constructor(props) {
		super(props);
		window.__files = this;
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
		window.__menu.check_files.unchecked();
	}
	addElement(index){
	}
	render(){
		return (
			<div id="files" ref={(c)=>this.content=c}>
				<div className="flex column">
					<div className="close">
						<span>
							Archivos
						</span>
						<button onClick={()=>this.closeClick()}>
							<i className="fa fa-times"></i>
						</button>
					</div>
					<div className="auto-flex content-project">
					</div>
				</div>
			</div>
		);
	}
};