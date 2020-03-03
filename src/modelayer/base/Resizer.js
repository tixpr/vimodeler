import Artefact from './Artefact';

//clase para redimensionar un artefacto
export default class Resizer extends Artefact{
	constructor(artefact, model, x, y, callback, extra = null){
		super(model,{});
		this.artefact = artefact;
		this.callback = callback;
		this.alter_elements = true;
		this.className = 'Resizer';
		this.x = x;
		this.y = y;
		if(extra){
			this.extra = extra;
		}
	}
	alterElements(x,y){
		if (this.extra) {
			this.artefact[this.callback](x,y, this.extra);
		} else {
			this.artefact[this.callback](x,y);
		}
	}
	applyStyle(ctx, x, y){
		ctx.fillStyle = '#eaffb2';
		ctx.strokeStyle = '#778851';
		ctx.lineWidth = 1;
		ctx.translate(x, y);
	}
	draw(ctx, p){
		ctx.save();
		this.applyStyle(ctx, p.x, p.y);
		ctx.beginPath();
		ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	hitTest(p1, p2){
		this.draw(window._ctx, p2);
		return window._ctx.isPointInPath(p1.x, p1.y);
	}
	getPosition(){
		return {
			x:this.x,
			y:this.y
		};
	}
};