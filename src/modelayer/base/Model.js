export default class Model{
	constructor(parent, object){
		this.parent = parent;
		this.cvs = parent.cvs;
		this.ctx = parent.ctx;
		this.temp_ctx = parent.temp_ctx;
		this.artefacts = [];
		this._artefact = null;
		this.core = object;
		this.sub_models = {};
	}
	set artefact(v){
		if(this.artefacts.remove(v)){
			this.artefacts.push(v);
			this._artefact = v;
			this.parent.artefact = v;
			v.draw(this.ctx);
		}
	}
	get artefact(){
		return this._artefact;
	}
	addArtefact(artefact){
		this.artefacts.push(artefact);
		this._artefact = artefact;
		this.parent.artefact = artefact;
		artefact.draw(this.ctx);
	}																																																																																																																																																																										
	clear(x, y, width, height){
		let px = x || 0,
			py = y || 0,
			w = width || this.cvs.width,
			h = height || this.cvs.height;
		this.ctx.clearRect(px, py, w, h);
	}
	draw(){
		this.clear();
		this.artefacts.map(artefact=>artefact.draw(this.ctx));
		if(this.artefact && this.artefact.resizers){
			this.artefact.drawResizers(this.ctx);
		}
	}
	hitTest(point){
		let e;
		if(this.artefact && this.artefact.resizers){
			for(let r of this.artefact.resizers){
				if(r.hitTest(point,this.artefact.getPosition())){
					e=r;
					break;
				}
			}
		}
		if (!e) {
			let i = this.artefacts.length - 1,
				artefact = this.artefacts[i--];
			while(artefact){
				if (artefact.hitTest(point)) {
					e = artefact;
					break;
				}
				artefact = this.artefacts[i--];
			}
		}
		return e;
	}
	intersecTest(x, y){
		console.error("Método intersectTest no especificado");
	}
	dropEvent(e){
		let art = e.dataTransfer.getData('text'),
			cons = this.constructores;
		if(art && cons[art]){
			let new_art = new cons[art](this,{name:art,x:e.layerX,y:e.layerY});
			this.addArtefact(new_art);
		}else{
			console.error('Elemento desconocido para '+this.className);
			console.info(art);
		}
	}
	set name(v){
		this.core.name = v;
	}
	get name(){
		return this.core.name;
	}
	set id(v){
		this.core.id = v;
	}
	get id(){
		return this.core.id;
	}
};