import Artefact, { defaults } from '../base/Artefact';

//========Propiedades del Label=============
const properties = [
	'x',
	'y',
	'name',
	'parentId',
	'className',
	'fontSize',
	'fontStyle',
	'fontFill',
	'fontFamily'
];


//artefcto texto de un mapa
export default class Label extends Artefact {
	constructor(map, obj, artefact = null) {
		super(map, obj);
		this.lx = this.fontWidth / 2;
		this.ly = this.fontHeight / 2;
		this.parent_artefact = artefact;
		this.addEventListener('dragend', () => this.dropLabel());
	}
	dropLabel() {
		console.info('drop label');
		if(this.parent_artefact){
			console.info('alter parent_artefact');
			this.parent_artefact.tx = this.x;
			this.parent_artefact.ty = this.y;
			console.info('parent_artefact',this.parent_artefact);
		}
	}
	applyStyle(ctx) {
		ctx.fillStyle = this.fontFill;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.translate(this.x, this.y);
		ctx.font = this.font();
	}
	draw(ctx) {
		ctx.save();
		this.applyStyle(ctx);
		let ts = this.name.split('\n'),
			h = -this.fontHeight / this.fontLine;
		if (ts.length > 1) {
			for (let i = 0, n = ts.length; i < n; i++) {
				ctx.fillText(ts[i], 0, h, this.fontWidth);
				h += this.fontSize;
			}
		} else {
			ctx.fillText(ts[0], 0, 0, this.fontWidth);
		}
		ctx.restore();
	}
	hitTest(point) {
		let vx = this.x - this.lx,
			vy = this.y - this.ly,
			w = vx + this.fontWidth,
			h = vy + this.fontHeight;
		if (point.x <= w && point.x >= vx && point.y >= vy && point.y <= h) {
			return true;
		} else {
			return false;
		}
	}
	toJSON() {
		let obj = null;
		if(!this.parent_artefact){
			obj = {};
			for(let p of properties){
				if(this[p] && this[p]!==defaults[p]){
					obj[p]=this[p];
				}
			}
		}
		return obj;
	}
};
