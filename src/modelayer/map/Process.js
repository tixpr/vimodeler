import Artefact, {defaults} from '../base/Artefact';
import Resizer from '../base/Resizer';

//========Propiedades a exportar en json=====================
const properties = [
	'id',
	'x',
	'y',
	'width',
	'height',
	'name',
	'className',
	'fontSize',
	'fontStyle',
	'fontFill',
	'fontFamily'
];
//artefacto proceso de un mapa
export default class Process extends Artefact {
	constructor(model, obj) {
		super(model, obj);
		if(!this.width){
			this.width = 100;
			this.x -= 50;
		}
		if(!this.height){
			this.height = 60;
			this.y -= 30;
		}
		this.inputs = {};
		this.outputs = {};
		this.resizers = [
			new Resizer(this, model, 0, 0, 'alterTopLeft'),
			new Resizer(this, model, this.width, 0, 'alterTopRight'),
			new Resizer(this, model, this.width, this.height, 'alterBottomRight'),
			new Resizer(this, model, 0, this.height, 'alterBottomLeft')
		];
		this.addEventListener('dragstart', (e) => this.dragResize(e), false);
		this.addEventListener('dragmove', (e) => this.dragResize(e), false);
		this.addEventListener('dragend', (e) => this.dragResize(e), false);
	}
	loadArtefact(){
		if(this.inputFlows){
			let temp = null;
			for(let mode in this.inputFlows){
				for(let p of this.inputFlows[mode]){
					temp = this.parent.artefacts.find(el=>el.id===p);
					if(temp){
						this.addInput(temp,mode);
					}
				}
			}
		}
		if(this.outputFlows){
			let temp = null;
			for(let mode in this.outputFlows){
				for(let p of this.outputFlows[mode]){
					temp = this.parent.artefacts.find(el=>el.id===p);
					if(temp){
						this.addOutput(temp,mode);
					}
				}
			}
		}
	}
	dragResize(e) {
		let d = { width: 0, height: 0 };
		d.width = this.x + this.width;
		d.height = this.y + this.height;
		this.parent.canvasResize(d);
	}
	addInput(flow, mode) {
		this.inputs[mode] = this.inputs[mode] || [];
		this.inputs[mode].push(flow);
	}
	removeInput(flow, mode) {
		if (this.inputs[mode]) {
			this.inputs[mode] = this.inputs[mode].filter(i=>i!==flow);
		}
	}
	addOutput(flow, mode) {
		this.outputs[mode] = this.outputs[mode] || [];
		this.outputs[mode].push(flow);
	}
	removeOutput(flow, mode) {
		if (this.outputs[mode]) {
			this.outputs[mode] = this.outputs[mode].filter(o=>o!==flow);
		}
	}
	alterTopLeft(x,y) {
		this.x += x;
		this.width -= x;
		this.y += y;
		this.height -= y;
		this.alterTopLeftElements(x,y);
		this.alterResizers();
	}
	alterTopRight(x,y) {
		this.width += x;
		this.y += y;
		this.height -= y;
		this.alterTopRightElements(x,y);
		this.alterResizers();
	}
	alterBottomRight(x,y) {
		this.width += x;
		this.height += y;
		this.alterBottomRightElements(x,y);
		this.alterResizers();
	}
	alterBottomLeft(x,y) {
		this.x += x;
		this.width -= x;
		this.height += y;
		this.alterBottomLeftElements(x,y);
		this.alterResizers();
	}
	alterTopLeftElements(x,y) {
		let il = this.inputs.left,
			it = this.inputs.top,
			ol = this.outputs.left,
			ot = this.outputs.top;
		if (il) {
			il.map(i => i.moveEndPoint(x, 0));
		}
		if (it) {
			it.map(i => i.moveEndPoint(0, y));
		}
		if (ol) {
			ol.map(o => o.moveStartPoint(x, 0));
		}
		if (ot) {
			ot.map(o => o.moveStartPoint(0, y));
		}
	}
	alterTopRightElements(x, y) {
		let ir = this.inputs.right,
			it = this.inputs.top,
			or = this.outputs.right,
			ot = this.outputs.top;
		if (ir) {
			ir.map(i => i.moveEndPoint(x, 0));
		}
		if (it) {
			it.map(i => i.moveEndPoint(0, y));
		}
		if (or) {
			or.map(o => o.moveStartPoint(x, 0));
		}
		if (ot) {
			ot.map(o => o.moveStartPoint(0, y));
		}
	}
	alterBottomRightElements(x, y) {
		let ir = this.inputs.right,
			ib = this.inputs.bottom,
			or = this.outputs.right,
			ob = this.outputs.bottom;
		if (ir) {
			ir.map(i => i.moveEndPoint(x, 0));
		}
		if (ib) {
			ib.map(i => i.moveEndPoint(0, y));
		}
		if (or) {
			or.map(o => o.moveStartPoint(x, 0));
		}
		if (ob) {
			ob.map(o => o.moveStartPoint(0, y));
		}
	}
	alterBottomLeftElements(x, y) {
		let il = this.inputs.left,
			ib = this.inputs.bottom,
			ol = this.outputs.left,
			ob = this.outputs.bottom;
		if (il) {
			il.map(i => i.moveEndPoint(x, 0));
		}
		if (ib) {
			ib.map(i => i.moveEndPoint(0, y));
		}
		if (ol) {
			ol.map(o => o.moveStartPoint(x, 0));
		}
		if (ob) {
			ob.map(o => o.moveStartPoint(0, y));
		}
	}
	applyStyle(ctx) {
		ctx.fillStyle = '#eceef7';
		ctx.strokeStyle = '#434343';
		ctx.lineWidth = 1;
		ctx.translate(this.x, this.y);
	}
	draw(ctx) {
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.rect(0, 0, this.width, this.height);
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = this.fontFill;
		ctx.font = this.font();
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.transform(1, 0, 0, 1, this.width/2, this.height/2);
		let ts = this.name.split('\n'),
			h = -this.fontHeight / this.fontLine;
		if (ts.length > 1) {
			for (let i = 0, n = ts.length; i < n; i++) {
				ctx.fillText(ts[i], 0, h);
				h += this.fontsize;
			}
		} else {
			ctx.fillText(ts[0], 0, 0);
		}
		ctx.restore();
	}
	drawResizers(ctx) {
		this.resizers.map(r => r.draw(ctx, this.getPosition()));
	}
	alterResizers() {
		this.resizers[1].x = this.width;
		this.resizers[2].x = this.width;
		this.resizers[2].y = this.height;
		this.resizers[3].y = this.height;
	}
	intersectTest(p) {
		let x = this.x,
			y = this.y,
			xw = this.x + this.width,
			yh = this.y + this.height;
		if (p.x > x && p.x < x + 10 && p.y > y + 10 && p.y < yh - 10) {
			return 'left';
		} else if (p.x > x + 10 && p.x < xw - 10 && p.y > y && p.y < y + 10) {
			return 'top';
		} else if (p.x > xw - 10 && p.x < xw && p.y > y - 10 && p.y < yh - 10) {
			return 'right';
		} else if (p.x > x + 10 && p.x < xw - 10 && p.y > yh - 10 && p.y < yh) {
			return 'bottom';
		} else {
			return 'none';
		}
	}
	alterElements(mx, my) {
		let m;
		for (m in this.inputs) {
			this.inputs[m].map(i=>i.moveEndPoint(mx,my));
		}
		for (m in this.outputs) {
			this.outputs[m].map(o=>o.moveStartPoint(mx,my));
		}
	}
	toJSON() {
		let obj = {};
		for(let p of properties){
			if(this[p] && this[p]!==defaults[p]){
				obj[p]=this[p];
			}
		}
		let inputs = {},
			outputs = {};
		for(let i in this.inputs){
			if(!inputs[i]){
				inputs[i] = [];
			}
			this.inputs[i].map(v=>inputs[i].push(v.id));
		}
		for(let i in this.outputs){
			if(!outputs[i]){
				outputs[i] = [];
			}
			this.outputs[i].map(v=>outputs[i].push(v.id));
		}
		obj.inputFlows = inputs;
		obj.outputFlows = outputs;
		return obj;
	}
};
