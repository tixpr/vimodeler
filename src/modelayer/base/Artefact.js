import EventCore from './EventCore';

//clase base de todos los artefactos
const defaults = {
	fontSize: 12,
	fontStyle: '',
	fontFill: '#000',
	fontFamily: 'arial'
};
export default class Artefact extends EventCore {
	constructor(model, obj) {
		if (model) {
			super();
			this.parent = model;
			for(let prop in obj){
				this[prop] = obj[prop];
			}
			for(let p in defaults){
				if(!this[p]){
					this[p] = defaults[p];
				}
			}
			this.dragging = false;
			this.alter_elements = false;
			if (this.name) {
				this.fontDimension(window._ctx);
			}
			this.addEventListener('dragmove', (e) => this.dragMove(e));
			this.addEventListener('dragstart', (e) => this.dragStart(e));
			this.addEventListener('dragend', (e) => this.dragEnd(e));
		} else {
			console.error("Modelo no proporcionado");
		}
	}
	drag(e) {
		let x = e.x || 0,
			y = e.y || 0;
		if (this.alter_elements) {
			this.alterElements(x, y);
		} else {
			this.x += x;
			this.y += y;
			if (this.alterElements) {
				this.alterElements(x, y);
			}
		}
		this.parent.draw();
	}
	alterElements(p){
		console.error('método alter element no implementado');
	}
	dragStart(e) {
		this.dragging = true;
		this.parent.artefact = this;
		this.drag(e);
	}
	dragMove(e) {
		this.drag(e);
	}
	dragEnd(e) {
		this.dragging = false;
		if (this.artefact && this.artefact.dragEndFlow) {
			this.artefact.dragEndFlow();
			this.parent.draw();
		}
	}
	font() {
		return this.fontStyle + ' ' + this.fontSize + 'px ' + this.fontFamily;
	}
	fontDimension(ctx) {
		ctx.save();
		this.applyStyle(ctx);
		let ts = this.name.split('\n'),
			t = 0,
			w = 0,
			h = this.fontSize;
		this.fontLine = ts.length;
		for(let txt of ts){
			t = ctx.measureText(txt).width;
			if (t > w) {
				w = t;
			}
			h += this.fontSize;
		}
		h -= this.fontSize;
		this.fontWidth = w;
		this.fontHeight = h;
		ctx.restore();
	}
	draw(ctx) {
		console.error("Función draw no implementada en el artefacto");
	}
	applyStyle(ctx) {
		console.error("No se especifico el estilo del artefacto");
	}
	getPosition() {
		return {
			x: this.x,
			y: this.y
		};
	}
	hitTest(p) {
		this.draw(window._ctx);
		return window._ctx.isPointInPath(p.x, p.y);
	}
};