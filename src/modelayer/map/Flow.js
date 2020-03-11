import Artefact,{defaults} from '../base/Artefact';
import Label from './Label';
import Resizer from '../base/Resizer';

//===============Propiedades a exportar en json================================
const properties = [
	'id',
	'x',
	'y',
	'tx',
	'ty',
	'name',
	'className',
	'points',
	'fontSize',
	'fontStyle',
	'fontFill',
	'fontFamily'
];

//artefacto flujo de un mapà
export default class Flow extends Artefact {
	constructor(model, object) {
		super(model, object);
		this.points = this.points || [{ x: this.x - 50, y: this.y }, { x: this.x + 50, y: this.y }];
		this.x = 0;
		this.y = 0;
		this.angle = 0;
		if(!this.tx){
			this.tx = this.points[0].x + 50;
		}
		if(!this.ty){
			this.ty = this.points[0].y + 10;
		}
		this.text = new Label(model, { name: this.name, x: this.tx, y: this.ty }, this);
		this.parent.addArtefact(this.text);
		let temp_resizers = [];
		//variable que controla que punto se a movido
		//0->no se mueve ningun punto
		//1->se mueve artefact punto inicial (start)
		//2->se mueve artefact punto final (end)
		this.mov_point = 0;
		this.addEventListener('dragend',()=>this.dropFlow());
		if (this.points.length === 2) {
			//redimensionador 1
			let r = new Resizer(this, model, this.points[0].x, this.points[0].y, 'moveStartPoint');
			r.addEventListener('dragend', (e) => this.dragEndResizer(e));
			temp_resizers.push(r);
			//redimensionador 2
			r = new Resizer(this, model, this.points[1].x, this.points[1].y, 'moveEndPoint');
			r.addEventListener('dragend', (e) => this.dragEndResizer(e));
			temp_resizers.push(r);
			this.resizers = temp_resizers;
		} else {
			let r = new Resizer(this, model, this.points[0].x, this.points[0].y, 'moveStartPoint'),
				n = this.points.length - 2;
			r.addEventListener('dragend', (e) => this.dragEndResizer(e));
			temp_resizers.push(r);
			for (let j = 1; j < n; j++) {
				r = new Resizer(this, model, this.points[j].x, this.points[j].y, 'movePoint', j);
				temp_resizers.push(r);
			}
			r = new Resizer(this, model, this.points[n].x, this.points[n].y, 'moveEndPoint');
			r.addEventListener('dragend', (e) => this.dragEndResizer(e));
			temp_resizers.push(r);
			this.resizers = temp_resizers;
		}
	}
	loadArtefact(){
		if(this.start_data){
			let temp = this.parent.artefacts.find(el=>el.id===this.start_data.id);
			if(temp){
				this.start = temp;
				this.startMode = this.start_data.mode;
			}
		}
		if(this.end_data){
			let temp = this.parent.artefacts.find(el=>el.id===this.end_data.id);
			if(temp){
				this.end = temp;
				this.endMode = this.end_data.mode;
			}
		}
	}
	setStart(artefact, mode) {
		let r = this.resizers[0],
			p = this.points[0];
		switch (mode) {
			case 'left':
				p.x = artefact.x;
				r.x = artefact.x;
				break;
			case 'top':
				p.y = artefact.y;
				r.y = artefact.y;
				break;
			case 'right':
				p.x = artefact.x + artefact.width;
				r.x = artefact.x + artefact.width;
				break;
			case 'bottom':
				p.y = artefact.y + artefact.height;
				r.y = artefact.y + artefact.height;
				break;
			default: break;
		}
		this.start = artefact;
		this.startMode = mode;
	}
	setEnd(artefact, mode) {
		let n = this.points.length,
			r = this.resizers[this.resizers.length - 1],
			e = artefact;
		let p = this.points[n - 1];
		switch (mode) {
			case 'left':
				p.x = e.x;
				r.x = e.x;
				this.angle = 0;
				break;
			case 'top':
				p.y = e.y;
				r.y = e.y;
				this.angle = 270;
				break;
			case 'right':
				p.x = e.x + e.width;
				r.x = e.x + e.width;
				this.angle = 180;
				break;
			case 'bottom':
				p.y = e.y + e.height;
				r.y = e.y + e.height;
				this.angle = 90;
				break;
			default: break;
		}
		this.end = artefact;
		this.endMode = mode;
	}
	applyStyle(ctx) {
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#000';
		ctx.fillStyle = '#000';
		ctx.lineCap = 'square';
		ctx.translate(this.x, this.y);
	}
	draw(ctx) {
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		let i = 0,
			n = this.points.length,
			point = this.points;
		ctx.moveTo(point[0].x, point[0].y);
		for (i = 1; i < n; i++) {
			ctx.lineTo(point[i].x, point[i].y);
		}
		//ctx.lineTo(mx,my);
		let mx = point[i - 1].x,
			my = point[i - 1].y;
		switch (this.angle) {
			case 0:
				ctx.lineTo(mx - 7, my);
				ctx.moveTo(mx, my);
				ctx.lineTo(mx - 9, my - 7);
				ctx.lineTo(mx - 9, my + 7);
				ctx.lineTo(mx, my);
				break;
			case 90:
				ctx.lineTo(mx, my + 7);
				ctx.moveTo(mx, my);
				ctx.lineTo(mx - 7, my + 9);
				ctx.lineTo(mx + 7, my + 9);
				ctx.lineTo(mx, my);
				break;
			case 180:
				ctx.lineTo(mx + 7, my);
				ctx.moveTo(mx, my);
				ctx.lineTo(mx + 9, my - 7);
				ctx.lineTo(mx + 9, my + 7);
				ctx.lineTo(mx, my);
				break;
			case 270:
				ctx.lineTo(mx, my - 7);
				ctx.moveTo(mx, my);
				ctx.lineTo(mx + 7, my - 9);
				ctx.lineTo(mx - 7, my - 9);
				ctx.lineTo(mx, my);
				break;
			default:break;
		}
		//ctx.fill();
		//ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
	drawResizers(ctx) {
		this.resizers.map(r => r.draw(ctx, this.getPosition()));
	}
	hitTest(point) {
		this.draw(window._ctx);
		return window._ctx.isPointInStroke(point.x, point.y) || window._ctx.isPointInPath(point.x, point.y);
	}
	dropFlow(){
		if (this.start) {
			this.start.removeOutput(this, this.startMode);
			delete this.start;
			delete this.startMode;
		}
		if (this.end) {
			this.end.removeInput(this, this.endMode);
			delete this.end;
			delete this.endMode;
			this.angle = 0;
		}
	}
	dragEndFlow() {
		let ps = this.points,
			r = this.resizers;
		for (let i = 0, n = ps.length; i < n; i++) {
			ps[i].x += this.x;
			ps[i].y += this.y;
		}
		for (let j = 0, m = r.length; j < m; j++) {
			r[j].x += this.x;
			r[j].y += this.y;
		}
		this.tx += this.x;
		this.ty += this.y;
		this.x = 0;
		this.y = 0;
	}
	dragEndResizer() {
		let r = this.resizers, obj;
		switch (this.mov_point) {
			case 1:
				obj = this.parent.intersectTest({ x: r[0].x, y: r[0].y });
				let pr = this.start;
				if (pr) {
					pr.removeOutput(this, this.startMode);
					delete this.start;
					delete this.startMode;
				}
				if (obj) {
					this.setStart(obj.artefact, obj.mode);
					obj.artefact.addOutput(this, obj.mode);
					this.parent.draw();
				}
				break;
			case 2:
				obj = this.parent.intersectTest({ x: r[r.length - 1].x, y: r[r.length - 1].y });
				let pe = this.end;
				if (pe) {
					pe.removeInput(this, this.endMode);
					delete this.end;
					delete this.endMode;
				}
				if (obj) {
					this.setEnd(obj.artefact, obj.mode);
					obj.artefact.addInput(this, obj.mode);
					this.parent.draw();
				}
				break;
			default: break;
		}
	}
	moveEndPoint(mx, my) {
		let point = this.points[this.points.length - 1];
		point.x += mx;
		point.y += my;
		let r = this.resizers[this.resizers.length - 1];
		r.x += mx;
		r.y += my;
		this.mov_point = 2;
	}
	moveStartPoint(mx, my) {
		let point = this.points[0];
		point.x += mx;
		point.y += my;
		let r = this.resizers[0];
		r.x += mx;
		r.y += my;
		this.mov_point = 1;
	}
	movePoint(mx, my, two_point) {
		// moviento un punto entre artefact inicio y final
		let r = this.resizers[two_point / 2],
			point = this.points;
		point[two_point] += mx;
		point[two_point + 1] += my;
		r.x += mx;
		r.y += my;
	}
	alterElements(mx, my) {
		this.text.x += mx;
		this.text.y += my;
	}
	toJSON() {
		let obj = {};
		for(let p of properties){
			if(this[p] && this[p]!==defaults[p]){
				obj[p]=this[p];
			}
		}
		if(this.start){
			obj['start_data'] = {id:this.start.id,mode:this.startMode};
		}
		if(this.end){
			obj['end_data'] = {id:this.end.id,mode:this.endMode};
		}
		return obj;
	}
};
