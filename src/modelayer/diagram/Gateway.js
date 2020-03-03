import EventArtefact from './EventArtefact';

//artefacto compuerta de un diagrama
export default class Gateway extends EventArtefact {
	applyStyle (ctx){
		ctx.fillStyle = '#fffeb9';
		ctx.strokeStyle = '#adc61c';
		ctx.lineWidth = 3;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.moveTo(this.x-15,this.y);
		ctx.lineTo(this.x, this.y-15);
		ctx.lineTo(this.x+15, this.y);
		ctx.lineTo(this.x, this.y+15);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
};
