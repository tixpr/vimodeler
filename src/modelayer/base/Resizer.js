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
	alterElements(mx, my){
		if (this.extra) {
			this.artefact[this.callback](mx, my, this.extra);
		} else {
			this.artefact[this.callback](mx, my);
		}
	}
	applyStyle(ctx, x, y){
		ctx.fillStyle = '#eaffb2';
		ctx.strokeStyle = '#778851';
		ctx.lineWidth = 1;
		ctx.translate(x, y);
		//ctx.transform(1, 0, 0, 1, x, y);
	}
	draw(ctx, point){
		ctx.save();
		this.applyStyle(ctx, point.x, point.y);
		ctx.beginPath();
		ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	hitTest(one_point, two_point){
		this.draw(this.temp_ctx, two_point);
		return this.temp_ctx.isPointInPath(one_point.x, one_point.y);
	}
	getPosition(){
		return {
			x:this.x,
			y:this.y
		};
	}
};