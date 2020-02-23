import Artefact from '../base/Artefact';
import Label from './Label';
import Resizer from '../base/Resizer';

//artefacto flujo de un mapà
export default class Flow extends Artefact{
	constructor(map, object){
		super(map, object);
		this.core.points = this.core.points || [this.x-50, this.y, this.x+50, this.y];
		this.className = 'Flow';
		this.x = 0;
		this.y = 0;
		let mx = this.points[0] + 50,
			my = this.points[1] + 10;
		this.text = new Label(map, {name:this.name,x:mx, y:my},this);
		this.parent.addArtefact(this.text);
		let temp_resizers = [];
		//variable que controla que punto se a movido
		//0->no se mueve ningun punto
		//1->se mueve artefact punto inicial (start)
		//2->se mueve artefact punto final (end)
		this.mov_point = 0;
		if ((this.points.length) / 2 === 2) {
			//redimensionador 1
			let r = new Resizer(this, map, this.points[0], this.points[1], 'moveStartPoint');
			r.addEventListener('dragend', (e)=>this.dragEndResizer(e));
			temp_resizers.push(r);
			//redimensionador 2
			r = new Resizer(this, map, this.points[2], this.points[3], 'moveEndPoint');
			r.addEventListener('dragend', (e)=>this.dragEndResizer(e));
			temp_resizers.push(r);
			this.resizers = temp_resizers;
		} else {
			let r = new Resizer(this, map, object.points[0], object.points[1], 'moveStartPoint'),
				n = this.points.length - 2;
			r.addEventListener('dragend', (e)=>this.dragEndResizer(e));
			temp_resizers.push(r);
			for (let j = 2; j < n; j += 2) {
				r = new Resizer(this, map, object.points[j], object.points[j + 1], 'movePoint', j);
				temp_resizers.push(r);
			}
			r = new Resizer(this, map, object.points[n], object.points[n + 1], 'moveEndPoint');
			r.addEventListener('dragend', (e)=>this.dragEndResizer(e));
			temp_resizers.push(r);
			this.resizers = temp_resizers;
		}
	}
	set points(val){
		this.core.points = val;
		this.parent.draw();
	}
	get points(){
		return this.core.points;
	}
	set angle(val){
		this.core.angle = val;
		this.parent.draw();
	}
	get angle(){
		return this.core.angle || 0;
	}
	setStart (art, mode){
		let r = this.resizers[0];
		switch (mode) {
			case 'left':
				this.points[0] = art.x;
				r.x = art.x;
				break;
			case 'top':
				this.points[1] = art.y;
				r.y = art.y;
				break;
			case 'right':
				this.points[0] = art.x + art.width;
				r.x = art.x + art.width;
				break;
			case 'bottom':
				this.points[1] = art.y + art.height;
				r.y = art.y + art.height;
				break;
			default: break;
		}
		this.start = art;
		this.startMode = mode;
	}
	setEnd (artefact, mode){
		let n = this.points.length,
			r = this.resizers[this.resizers.length - 1],
			e = artefact;
		switch (mode) {
			case 'left':
				this.points[n - 2] = e.x;
				r.x = e.x;
				this.angle = 0;
				break;
			case 'top':
				this.points[n - 1] = e.y;
				r.y = e.y;
				this.angle = 270;
				break;
			case 'right':
				this.points[n - 2] = e.x + e.width;
				r.x = e.x + e.width;
				this.angle = 180;
				break;
			case 'bottom':
				this.points[n - 1] = e.y + e.height;
				r.y = e.y + e.height;
				this.angle = 90;
				break;
			default:break;
		}
		this.end = artefact;
		this.endMode = mode;
	}
	applyStyle (ctx){
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#000';
		ctx.fillStyle = '#000';
		ctx.lineCap = 'square';
		ctx.translate(this.x, this.y);
	}
	draw(ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		let i = 0,
			n = this.points.length,
			point = this.points;
		ctx.moveTo(point[0], point[1]);
		for (i = 2; i < n-1; i += 2) {
			ctx.lineTo(point[i], point[i + 1]);
		}
		//ctx.lineTo(mx,my);
		let mx = point[i - 2],
			my = point[i - 1];
		switch (this.angle) {
			case 0:
				ctx.lineTo(mx-7,my);
				ctx.moveTo(mx,my);
				ctx.lineTo(mx - 9, my - 7);
				ctx.lineTo(mx - 9, my + 7);
				ctx.lineTo(mx, my);
				break;
			case 90:
				ctx.lineTo(mx,my+7);
				ctx.moveTo(mx,my);
				ctx.lineTo(mx - 7, my + 9);
				ctx.lineTo(mx + 7, my + 9);
				ctx.lineTo(mx, my);
				break;
			case 180:
				ctx.lineTo(mx+7,my);
				ctx.moveTo(mx,my);
				ctx.lineTo(mx + 9, my - 7);
				ctx.lineTo(mx + 9, my + 7);
				ctx.lineTo(mx, my);
				break;
			case 270:
				ctx.lineTo(mx,my-7);
				ctx.moveTo(mx,my);
				ctx.lineTo(mx + 7, my - 9);
				ctx.lineTo(mx - 7, my - 9);
				ctx.lineTo(mx, my);
				break;
			default:
				console.error('angulo no especificado en artefact flujo');
		}
		//ctx.fill();
		//ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
	drawResizers (ctx){
		for (let n = this.resizers.length - 1; n >= 0; n--) {
			this.resizers[n].draw(ctx, this.getPosition());
		}
	}
	hitTest (point){
		this.draw(this.temp_ctx);
		return this.temp_ctx.isPointInStroke(point.x, point.y) || this.temp_ctx.isPointInPath(point.x, point.y);
	}
	dragEndFlow(){
		let ps = this.points,
			r = this.resizers;
		for (let i = 0, n = ps.length; i < n; i += 2) {
			ps[i] += this.x;
			ps[i + 1] += this.y;
		}
		for (let j = 0, m = r.length; j < m; j++) {
			r[j].x += this.x;
			r[j].y += this.y;
		}
		this.x = 0;
		this.y = 0;
		/*
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
		*/
	}
	dragEndResizer(){
		let r = this.resizers, point;
		switch (this.mov_point) {
			case 1:
				point = this.parent.intersectTest(r[0].x, r[0].y);
				let pr = this.start;
				if (pr) {
					pr.removeOutput(this, this.startMode);
					delete this.start;
					delete this.startMode;
				}
				if (point) {
					this.setStart(point.artefact, point.mode);
					point.artefact.addOutput(this, point.mode);
					this.parent.draw();
				} else {
					//console.info('ningun elemento dentro del drag->start');
				}
				break;
			case 2:
				point = this.parent.intersectTest(r[r.length - 1].x, r[r.length - 1].y);
				let pe = this.end;
				if (pe) {
					pe.removeInput(this, this.endMode);
					delete this.end;
					delete this.endMode;
				}
				if (point) {
					this.setEnd(point.artefact, point.mode);
					point.artefact.addInput(this, point.mode);
					this.parent.draw();
				} else {
					//console.info('ningun proceso dentro del drag->end');
				}
				break;
			default:break;
		}
	}
	moveEndPoint (mx, my){
		let point = this.points;
		let n = point.length;
		point[n - 2] += mx;
		point[n - 1] += my;
		let r = this.resizers[this.resizers.length - 1];
		r.x += mx;
		r.y += my;
		this.mov_point = 2;
	}
	moveStartPoint (mx, my){
		let point = this.points;
		point[0] += mx;
		point[1] += my;
		let r = this.resizers[0];
		r.x += mx;
		r.y += my;
		this.mov_point = 1;
	}
	movePoint (mx, my, two_point){
		// moviento un punto entre artefact inicio y final
		let r = this.resizers[two_point / 2],
			point = this.points;
		point[two_point] += mx;
		point[two_point + 1] += my;
		r.x += mx;
		r.y += my;
	}
	alterElements (mx, my){
		this.text.x += mx;
		this.text.y += my;
	}
	toJSON(){
		return JSON.stringify(this.core);
	}
};
