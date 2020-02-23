import EventArtefact from './EventArtefact';

//artefacto compuerta de un diagrama
export default class Gateway extends EventArtefact {
	constructor (diagram, object){
		super(diagram, object);
		this.className = 'Gateway';
	}
	applyStyle (ctx){
		ctx.fillStyle = '#fffeb9';
		ctx.strokeStyle = '#adc61c';
		ctx.lineWidth = 3;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.moveTo(this.core.x-15,this.core.y);
		ctx.lineTo(this.core.x, this.core.y-15);
		ctx.lineTo(this.core.x+15, this.core.y);
		ctx.lineTo(this.core.x, this.core.y+15);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
};
