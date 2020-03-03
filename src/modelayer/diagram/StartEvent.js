import EventArtefact from './EventArtefact';

//artefacto evento de inicio de un diagrama
export default class StartEvent extends EventArtefact{
	applyStyle (ctx){
		ctx.fillStyle = '#eeffaf';
		ctx.strokeStyle = '#799a45';
		ctx.lineWidth = 2;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
};
