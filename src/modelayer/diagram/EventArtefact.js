import Artefact from '../base/Artefact';
import Label from '../map/Label';


//clase base de los artefactos evento
export default class EventArtefact extends Artefact{
	constructor  (diagram, object){
		super(diagram, object);
		this.inputs = {};
		this.outputs = {};
		this.text = new Label(diagram, {name:this.name,x:this.x, y:this.y+30},this);
		this.parent.addArtefact(this.text);
	}
	addInput (artefact, mode){
		this.inputs[mode] = this.inputs[mode] || [];
		this.inputs[mode].push(artefact);
	}
	removeInput (artefact, mode){
		let i = this.inputs[mode];
		if(i){
			i.remove(artefact);
		}
	}
	addOutput (artefact, mode){
		this.outputs[mode] = this.outputs[mode] || [];
		this.outputs[mode].push(artefact);
	}
	removeOutput (artefact, mode){
		let o = this.outputs[mode];
		if(o){
			o.remove(artefact);
		}
	}
	intersectTest (px, py){
		let e = this.core;
		let x = e.x,
			y = e.y;
		if(x-15<px && px<x-5 && y-5<py && py < y+5){
			return 'left';
		}else if(x-5<px && px<x+5 && y-15<py && py < y-5){
			return 'top';
		}else if(x+5<px && px<x+15 && y-5<py && py < y+5){
			return 'right';
		}else if(x-5<px && px<x+5 && y+5<py && py < y+15){
			return 'bottom';
		}else{
			return 'none';
		}
	}
	alterElements (mx, my){
		this.text.x += mx;
		this.text.y += my;
		for(let els1 in this.inputs){
			this.inputs[els1].map(el=>el.moveEndPoint(mx,my));
		}
		for(let els2 in this.outputs){
			this.outputs[els2].map(el=>el.moveStartPoint(mx,my));
		}
	}
};
