import EventArtefact from './EventArtefact';

//artefacto evento intermedio de un diagrama
export default class IntermediateEvent extends EventArtefact {
	constructor (diagram, object){
		super(diagram, object);
		this.className = 'IntermediateEvent';
	}
	applyStyle (ctx){
		ctx.fillStyle = '#fefcf4';
		ctx.strokeStyle = '#928d43';
		ctx.lineWidth = 2;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.arc(this.core.x, this.core.y, 15, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
};