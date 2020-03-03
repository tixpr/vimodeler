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
		if(this.inputs[mode]){
			this.inputs[mode] = this.inputs[mode].filter(i=>i!==artefact)
		}
	}
	addOutput (artefact, mode){
		this.outputs[mode] = this.outputs[mode] || [];
		this.outputs[mode].push(artefact);
	}
	removeOutput (artefact, mode){
		if(this.outputs[mode]){
			this.outputs[mode] = this.outputs[mode].filter(o=>o!==artefact);
		}
	}
	intersectTest (p){
		let e = this;
		let x = e.x,
			y = e.y;
		if(x-15<p.x && p.x<x-5 && y-5<p.y && p.y < y+5){
			return 'left';
		}else if(x-5<p.x && p.x<x+5 && y-15<p.y && p.y < y-5){
			return 'top';
		}else if(x+5<p.x && p.x<x+15 && y-5<p.y && p.y < y+5){
			return 'right';
		}else if(x-5<p.x && p.x<x+5 && y+5<p.y && p.y < y+15){
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
