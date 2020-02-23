import EventCore from './EventCore';

//clase base de todos los artefactos
export default class Artefact extends EventCore {
	constructor(model, object) {
		if (model) {
			super();
			this.parent = model;
			this.ctx = model.ctx;
			this.temp_ctx = model.temp_ctx;
			this.core = object;
			this.dragging = false;
			this.alter_elements = false;
			if (this.core !== null) {
				this.fontDimension(this.temp_ctx);
			}
			this.addEventListener('dragmove', (e) => this.dragMove(e));
			this.addEventListener('dragstart', (e) => this.dragStart(e));
			this.addEventListener('dragend', (e) => this.dragEnd(e));
		} else {
			console.error("Modelo no proporcionado");
		}
	}
	drag(e) {
		// Manejar artefact evento drag en todos los elementos dentro del modelo
		let mx = e.x || 0,
			my = e.y || 0;
		if (this.alter_elements) {
			//console.info('alterando elementos desde alter_elements');
			this.alterElements(mx, my);
		} else {
			this.x += mx;
			this.y += my;
			if (this.alterElements) {
				//console.info('alterando elementos desde alterElements');
				this.alterElements(mx, my);
			}
		}
		this.parent.draw();
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
	set fontSize(v) {
		this.core.fontSize = v;
		this.fontDimension(this.temp_ctx);
		this.parent.draw();
	}
	get fontSize() {
		return this.core.fontSize || 12;
	}
	set fontStyle(v) {
		this.core.fontStyle = v;
		this.fontDimension(this.temp_ctx);
		this.parent.draw();
	}
	get fontStyle() {
		return this.core.fontStyle || '';
	}
	set fontFill(v) {
		this.core.fontFill = v;
		this.parent.draw();
	}
	get fontFill() {
		return this.core.fontFill || '#000';
	}
	set fontFamily(v) {
		this.core.fontFamily = v;
		this.fontDimension(this.temp_ctx);
		this.parent.draw();
	}
	get fontFamily() {
		return this.core.fontFamily || 'arial';
	}
	get font() {
		return this.fontStyle + ' ' + this.fontSize + 'px ' + this.fontFamily;
	}
	set name(v) {
		this.core.name = v;
		this.fontDimension(this.temp_ctx);
		this.parent.draw();
	}
	get name() {
		return this.core.name || '';
	}
	set className(v = null) {
		this.core.className = v;
	}
	get className() {
		return this.core.className || '';
	}
	set x(v) {
		this.core.x = v;
	}
	get x() {
		return this.core.x;
	}
	set y(v) {
		this.core.y = v;
	}
	get y() {
		return this.core.y;
	}
	fontDimension(ctx) {
		//console.info(me);
		ctx.save();
		this.applyStyle(ctx);
		let ts = this.name.split('\n'),
			t = 0,
			w = 0,
			h = this.fontSize;
		this.fontLine = ts.length;
		for (let i = 0, n = ts.length; i < n; i++) {
			t = ctx.measureText(ts[i]).width;
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
	hitTest(point) {
		this.draw(this.temp_ctx);
		return this.temp_ctx.isPointInPath(point.x, point.y);
	}
};