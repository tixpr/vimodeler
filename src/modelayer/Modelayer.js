import EventCore from './base/EventCore';
//=============MAP==================
import Process from './map/Process';
import Flow from './map/Flow';
import Label from './map/Label';
//============Diagram===============
import Task from './diagram/Task';
import StartEvent from './diagram/StartEvent';
import IntermediateEvent from './diagram/IntermediateEvent';
import EndEvent from './diagram/EndEvent';
import Sequence from './diagram/Sequence';
import Gateway from './diagram/Gateway';

//===========Propiedades del modelo para el json=====================
const properties = [
	'id',
	'name',
	'diagram',
	'width',
	'height',
	'parentModel',
];

export default class Modelayer extends EventCore{
	constructor(canvas, mode,model=null) {
		super();
		if(canvas.getContext){
			this.cvs = canvas;
			this.ctx = this.cvs.getContext('2d');
			window._ctx = document.createElement('canvas').getContext('2d');
			this.cvs.addEventListener('mousedown',(e)=>this.mouseDown(e),false);
			this.cvs.addEventListener('mouseup',(e)=>this.mouseUp(e),false);
			this.cvs.addEventListener('dragover',(e)=>this.dragOver(e),false);
			this.cvs.addEventListener('dragleave',(e)=>this.dragLeave(e),false);
			this.cvs.addEventListener('drop',(e)=>this.drop(e),false);
			this.mode = mode;
			this.artefacts=[];
			if(model){
				for(let prop in model){
					this[prop] = model[prop];
				}
				this.elements = this.elements||[];
			}
			if(!this.index){
				this.index=1;
			}
			if(!this.width){
				this.width=window.screen.width;
			}
			if(!this.height){
				this.height=window.screen.height;
			}
			this.artefact = null;
			this.intersectTest = null;
			this.constructors = {};
			this.mouseMove = (e)=>this.mouse_move(e);
			switch(mode){
				case "Map":
					this.constructors = {
						Process,
						Flow,
						Label
					};
					this.intersectTest = this.itsMap;
					break;
				case 'Diagram':
					this.constructors = {
						Task,
						StartEvent,
						IntermediateEvent,
						EndEvent,
						Sequence,
						Gateway
					};
					this.intersects = [
						'Task',
						'StartEvent',
						'IntermediateEvent',
						'EndEvent',
						'Gateway'
					];
					this.intersectTest = this.itsDiagram;
					break;
				default: break;
			}
			if(!model){
				this.cvs.setAttribute('width', window.screen.width);
				this.cvs.setAttribute('height', window.screen.height);
			}else{
				this.cvs.setAttribute('width', Math.max(window.screen.width,this.width));
				this.cvs.setAttribute('height',Math.max(window.screen.height,this.height));
				this.loadModel();
			}
		}else{
			console.error('Su navegador no soporta Canvas, actualizar a la ultima versión estable disponible');
		}
	}
	loadModel(){
		let cons = this.constructors, art=null;
		for(let el of this.elements){
			art = new cons[el.className](this,el);
			this.addArtefact(art);
		}
		console.info('atefactos creados');
		for(let art of this.artefacts){
			art.loadArtefact();
		}
	}
	mouse_move(e){
		e.preventDefault();
		let x = e.movementX || e.mozMovementX || 0,
			y = e.movementY || e.mozMovementY || 0;
		if (this.artefact.dragging) {
			this.artefact.dispatchEvent('dragmove', {x, y});
		} else {
			this.artefact.dispatchEvent('dragstart', {x, y});
		}
		return false;
	}
	mouseDown(e){
		e.preventDefault();
		let a = this.hitTest({x: e.layerX,y: e.layerY});
		if(a){
			this.selectArtefact(a);
			this.cvs.addEventListener('mousemove',this.mouseMove,false);
		}else{
			delete this.artefact;
			this.draw();
		}
		return false;
	}
	mouseUp(e){
		e.preventDefault();
		let a = this.artefact;
		let x = e.movementX || e.mozMovementX || 0,
			y = e.movementY || e.mozMovementY || 0;
		if(a){
			if(a.dragging){
				a.dispatchEvent('dragend',{x, y});
			} else {
				a.dispatchEvent('click',{x,y});
			}
			if(this.artefact.className==="Resizer"){
				this.artefact = this.artefact.artefact;
			}else{
				this.artefact = a;
			}
			this.draw();
		}
		this.cvs.removeEventListener('mousemove',this.mouseMove);
		return false;
	}
	dragOver(e){
		e.preventDefault();
		return false;
	}
	dragLeave(e){
		e.preventDefault();
		return false;
	}
	canvasResize(d){
		if(this.cvs.clientWidth<d.width){
			this.cvs.setAttribute('width', d.width);
		}
		if(this.cvs.clientHeight<d.height){
			this.cvs.setAttribute('height', d.height);
		}
		this.draw();
	}
	//===============class Model======================
	selectArtefact(a){
		this.artefact = a;
		if(this.artefacts.indexOf(a)>-1){
			this.artefacts = this.artefacts.filter(el=>el!==a);
			this.artefacts.push(a);
			a.draw(this.ctx);
		}
	}
	addArtefact(a){
		this.artefacts.push(a);
		this.artefact = a;
		a.draw(this.ctx);
	}
	clear(x=0, y=0, width=this.cvs.width, height=this.cvs.height){
		this.ctx.clearRect(x, y, width, height);
	}
	draw(){
		this.clear();
		this.artefacts.map(a=>a.draw(this.ctx));
		if(this.artefact){
			if(this.artefact.className==="Resizer"){
				this.artefact.artefact.drawResizers(this.ctx);
			}
			if(this.artefact.resizers){
				this.artefact.drawResizers(this.ctx);
			}
		}
	}
	hitTest(p){
		let e=null;
		if(this.artefact && this.artefact.resizers){
			e = this.artefact.resizers.find(el=>el.hitTest(p,this.artefact.getPosition()));
		}
		if (!e) {
			let i = this.artefacts.length - 1,
				a = this.artefacts[i--];
			while(a){
				if (a.hitTest(p)) {
					e = a;
					break;
				}
				a = this.artefacts[i--];
			}
		}
		return e;
	}
	itsDiagram(p){
		let a = null,
			mode = 'none';
		for(let artefact of this.artefacts){
			if(this.intersects.indexOf(artefact.className)>-1){
				if(artefact.hitTest(p)){
					mode = artefact.intersectTest(p);
					a={
						artefact,
						mode
					};
					break;
				}
			}
		}
		return a;
	}
	itsMap(p){
		let as = this.artefacts.filter(a=>a.className==="Process"),
			a,
			mode = 'none';
		for(let artefact of as){
			if(artefact.hitTest(p)){
				mode= artefact.intersectTest(p);
				a={
					artefact,
					mode
				};
				break;
			}
		}
		return a;
	}
	drop(e){
		e.preventDefault();
		let a = e.dataTransfer.getData('text'),
			cons = this.constructors;
		if(a && cons[a]){
			let a_new = new cons[a](this,{id:this.index++,name:a,x:e.layerX,y:e.layerY,className:a});
			console.info(a_new);
			this.addArtefact(a_new);
		}
	}
	toJSON(){
		let obj = {};
		for(let p of properties){
			if(this[p]){
				obj[p]=this[p];
			}
		}
		let artefacts = [], temp;
		for(let art of this.artefacts){
			temp = art.toJSON();
			if(temp){
				artefacts.push(temp);
			}
		}
		obj.elements = artefacts;
		console.info(obj);
		return obj;
	}
}