import EventCore from './base/EventCore';
import ProcessMap from './ProcessMap';
import ProcessDiagram from './ProcessDiagram';
//elementos

Array.prototype.remove = Array.prototype.remove || 
						function(e) {
							let i = this.indexOf(e);
							if (i > -1) {
								this.splice(i, 1);
								return true;
							} else {
								//console.error('El artefacto no existe dentro del array');
								return false;
							}
						};
function mouse_move (e){
	let ml = window.__modelayer;
	if(ml){
		//console.info(ml.artefact);
		e.preventDefault();
		let mx = e.movementX || e.mozMovementX || 0,
			my = e.movementY || e.mozMovementY || 0;
		if (ml.artefact.dragging) {
			ml.artefact.dispatchEvent('dragmove', {x: mx, y:my});
		} else {
			ml.artefact.dispatchEvent('dragstart', {x: mx, y:my});
		}
		return false;
	}
}

export default class Modelayer extends EventCore{
	constructor(cvs) {
		super();
		if(cvs.getContext){
			this.cvs = cvs;
			this.ctx = cvs.getContext('2d');
			this.temp_ctx = document.createElement('canvas').getContext('2d');
			this.cvs.addEventListener('mousedown',(e)=>this.mouseDown(e),false);
			this.cvs.addEventListener('mouseup',(e)=>this.mouseUp(e),false);
			this.cvs.addEventListener('dragover',(e)=>this.dragOver(e),false);
			this.cvs.addEventListener('dragleave',(e)=>this.dragLeave(e),false);
			this.cvs.addEventListener('drop',(e)=>this.drop(e),false);
			this.className = 'Modelayer';
			this.models = [];
			this._model = null;
			this._artefact = null;
			window.__modelayer = this;
		}else{
			console.error('Su navegador no soporta Canvas, actualizar a la ultima versión estable disponible');
		}
	}
	set model(v){
		if(this.models.indexOf(v)>-1){
			this._model = v;
			v.draw();
		}else{
			console.error("el modelo proporcionado no se encuentra dentro de los modelos del Modelador");
		}
	}
	get model(){
		return this._model;
	}
	set artefact(v){
		this._artefact=v;
	}
	get artefact(){
		return this._artefact;
	}
	mouseDown(e){
		e.preventDefault();
		let point = {
			x: e.layerX,
			y: e.layerY
		};
		let artefact = this.model.hitTest(point);
		if(artefact){
			this.artefact = artefact;
			this.cvs.addEventListener('mousemove',mouse_move,false);
		}else{
			let opt = false;
			if(this.artefact && this.model.artefact){
				opt = true;
			}
			delete this.artefact;
			delete this.model.artefact;
			if(opt){
				this.model.draw();
			}
		}
		return false;
	}
	mouseUp(e){
		e.preventDefault();
		let artefact = this.artefact;
		let mx = e.movementX || e.mozMovementX || 0,
			my = e.movementY || e.mozMovementY || 0;
		if(artefact){
			if(artefact.dragging){
				artefact.dispatchEvent('dragend',{x:mx, y:my});
				this.model.artefact = artefact;
				this.model.draw();
			} else {
				artefact.dispatchEvent('click',{x:mx,y:my});
				this.model.artefact = artefact;
				this.model.draw();
			}
		}else{
			console.info('artefacto no seleccionado');
		}
		this.cvs.removeEventListener('mousemove',mouse_move);
		return false;
	}
	dragOver(e){
		//console.info('drag over');
		e.preventDefault();
		//this.cvs.classList.add('dragover');
		return false;
	}
	dragLeave(e){
		//console.info('drag leave');
		e.preventDefault();
		//this.cvs.classList.remove('dragover');
		return false;
	}
	drop(e){
		//console.info('drop');
		e.preventDefault();
		this.model.dropEvent(e);
	}
	addProcessMap(name){
		let map = new ProcessMap(this,{name:name});
		this.models.push(map);
		this.model = map;
		//return map;
	}
	addProcessDiagram(name){
		let diagram = new ProcessDiagram(this,{name:name});
		this.models.push(diagram);
		this.model = diagram;
		//return diagram;
	}
	addProject(name){
		console.info('creando un proyecto de modelado de procesos');
	}
	canvasResize(dimension){
		//console.info('resize');
		//console.info(dimension);
		if(this.cvs.clientWidth<dimension.width){
			this.cvs.setAttribute('width', dimension.width+'px');
		}
		if(this.cvs.clientHeight<dimension.height){
			this.cvs.setAttribute('height', dimension.height+'px');
		}
		this.model.draw();
	}
}