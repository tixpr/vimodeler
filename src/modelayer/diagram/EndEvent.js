import EventArtefact from './EventArtefact';

//artefacto evento de finalización de un diagrama
export default class EndEvent extends EventArtefact {
	constructor (diagram, object){
		super(diagram, object);
		this.className = 'EndEvent';
	}
	applyStyle (ctx){
		ctx.fillStyle = '#fcc9c8';
		ctx.strokeStyle = '#840e1b';
		ctx.lineWidth = 2;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.arc(this.core.x, this.core.y, 15, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
}
