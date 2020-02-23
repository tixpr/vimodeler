import Artefact from '../base/Artefact';
import Resizer from '../base/Resizer';

//artefacto proceso de un mapa
export default class Process extends Artefact {
	constructor(map, object) {
		super(map, object);
		let w = this.width,
			h = this.height;
		this.core.x = this.x - w / 2;
		this.core.y = this.y - h / 2;
		this.core.width = this.core.width || 100;
		this.core.height = this.core.height || 60;
		this.lwidth = w - 10;
		this.className = 'Process';
		this.inputs = {};
		this.outputs = {};
		let temp_resizers = [];
		//redimensionador 1
		let r = new Resizer(this, map, 0, 0, 'alterTopLeft');
		temp_resizers.push(r);
		r = new Resizer(this, map, w, 0, 'alterTopRight');
		temp_resizers.push(r);
		r = new Resizer(this, map, w, h, 'alterBottomRight');
		temp_resizers.push(r);
		r = new Resizer(this, map, 0, h, 'alterBottomLeft');
		temp_resizers.push(r);
		this.resizers = temp_resizers;
		this.addEventListener('dragstart', (e) => this.dragResize(e), false);
		this.addEventListener('dragmove', (e) => this.dragResize(e), false);
		this.addEventListener('dragend', (e) => this.dragResize(e), false);
		console.info(this.core);
	}
	get lx() {
		return this.width / 2;
	}
	get ly() {
		return this.height / 2;
	}
	set width(val) {
		this.core.width = val;
	}
	get width() {
		let r = this.core.width || 100;
		return r;
	}
	set height(val) {
		this.core.height = val;
	}
	get height() {
		return this.core.height || 60;
	}
	dragResize(e) {
		let dimension = { width: 0, height: 0 };
		dimension.width = this.x + this.width;
		dimension.height = this.y + this.height;
		window.__modelayer.canvasResize(dimension);
	}
	addInput(flow, mode) {
		this.inputs[mode] = this.inputs[mode] || [];
		this.inputs[mode].push(flow);
	}
	removeInput(flow, mode) {
		let i = this.inputs[mode];
		if (i) {
			i.remove(flow);
		}
	}
	addOutput(flow, mode) {
		this.outputs[mode] = this.outputs[mode] || [];
		this.outputs[mode].push(flow);
	}
	removeOutput(flow, mode) {
		let o = this.outputs[mode];
		if (o) {
			o.remove(flow);
		}
	}
	alterTopLeft(mx, my) {
		this.x += mx;
		this.width -= mx;
		this.y += my;
		this.height -= my;
		this.alterTopLeftElements(mx, my);
		this.alterResizers();
	}
	alterTopRight(mx, my) {
		this.width += mx;
		this.y += my;
		this.height -= my;
		this.alterTopRightElements(mx, my);
		this.alterResizers();
	}
	alterBottomRight(mx, my) {
		this.width += mx;
		this.height += my;
		this.alterBottomRightElements(mx, my);
		this.alterResizers();
	}
	alterBottomLeft(mx, my) {
		this.x += mx;
		this.width -= mx;
		this.height += my;
		this.alterBottomLeftElements(mx, my);
		this.alterResizers();
	}
	alterTopLeftElements(mx, my) {
		let il = this.inputs.left,
			it = this.inputs.top,
			ol = this.outputs.left,
			ot = this.outputs.top;
		if (il) {
			il.map(i => i.moveEndPoint(mx, 0));
		}
		if (it) {
			it.map(i => i.moveEndPoint(0, my));
		}
		if (ol) {
			ol.map(o => o.moveStartPoint(mx, 0));
		}
		if (ot) {
			ot.map(o => o.moveStartPoint(0, my));
		}
	}
	alterTopRightElements(mx, my) {
		let ir = this.inputs.right,
			it = this.inputs.top,
			or = this.outputs.right,
			ot = this.outputs.top;
		if (ir) {
			ir.map(i => i.moveEndPoint(mx, 0));
		}
		if (it) {
			it.map(i => i.moveEndPoint(0, my));
		}
		if (or) {
			or.map(o => o.moveStartPoint(mx, 0));
		}
		if (ot) {
			ot.map(o => o.moveStartPoint(0, my));
		}
	}
	alterBottomRightElements(mx, my) {
		let ir = this.inputs.right,
			ib = this.inputs.bottom,
			or = this.outputs.right,
			ob = this.outputs.bottom;
		if (ir) {
			ir.map(i => i.moveEndPoint(mx, 0));
		}
		if (ib) {
			ib.map(i => i.moveEndPoint(0, my));
		}
		if (or) {
			or.map(o => o.moveStartPoint(mx, 0));
		}
		if (ob) {
			ob.map(o => o.moveStartPoint(0, my));
		}
	}
	alterBottomLeftElements(mx, my) {
		let il = this.inputs.left,
			ib = this.inputs.bottom,
			ol = this.outputs.left,
			ob = this.outputs.bottom;
		if (il) {
			il.map(i => i.moveEndPoint(mx, 0));
		}
		if (ib) {
			ib.map(i => i.moveEndPoint(0, my));
		}
		if (ol) {
			ol.map(o => o.moveStartPoint(mx, 0));
		}
		if (ob) {
			ob.map(o => o.moveStartPoint(0, my));
		}
	}
	applyStyle(ctx) {
		ctx.fillStyle = '#eceef7';
		ctx.strokeStyle = '#434343';
		ctx.lineWidth = 1;
		//ctx.transform(1, 0, 0, 1, this.x, this.y);
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
		ctx.font = this.font;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.transform(1, 0, 0, 1, this.lx, this.ly);
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
	intersectTest(px, py) {
		//console.info('x->'+ obj.x + ', y->' + obj.y + '; width->' + obj.width + ', height->' + obj.height);
		let x = this.x,
			y = this.y,
			xw = this.x + this.width,
			yh = this.y + this.height;
		if (px > x && px < x + 10 && py > y + 10 && py < yh - 10) {
			return 'left';
		} else if (px > x + 10 && px < xw - 10 && py > y && py < y + 10) {
			return 'top';
		} else if (px > xw - 10 && px < xw && py > y - 10 && py < yh - 10) {
			return 'right';
		} else if (px > x + 10 && px < xw - 10 && py > yh - 10 && py < yh) {
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
};
