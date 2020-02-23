import Process from '../map/Process';

//artefacto de tarea de un diagrama
export default class Task extends Process{
	constructor(diagram, object){
		super(diagram, object);
		this.className = 'Task';
	}
	applyStyle (ctx){
		ctx.fillStyle = '#f7f7ff';
		ctx.strokeStyle = '#1c75bc';
		ctx.lineWidth = 2;
		ctx.translate(this.core.x,this.core.y);
	}
};
