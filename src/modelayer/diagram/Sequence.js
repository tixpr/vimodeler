import Flow from '../map/Flow';

//artefacto de sequencia en diagrama
export default class Sequence extends Flow{
	constructor (diagram, object){
		super(diagram, object);
		this.className = 'Sequence';
	}
	setStart (artefact, mode){
		let r = this.resizers[0], e = artefact.core;
		if(mode === 'none'){
			mode = 'right';
		}
		if(e.className === 'Task'){
			switch (mode) {
				case 'left':
					this.core.points[0] = e.x;
					r.x = e.x;
					break;
				case 'top':
					this.core.points[1] = e.y;
					r.y = e.y;
					break;
				case 'right':
					this.core.points[0] = e.x + e.width;
					r.x = e.x + e.width;
					break;
				case 'bottom':
					this.core.points[1] = e.y + e.height;
					r.y = e.y + e.height;
					break;
				default:break;
			}
		}else{
			switch (mode) {
				case 'left':
					this.core.points[0] = e.x-15;
					this.core.points[1] = e.y;
					r.x = e.x-15;
					r.y = e.y;
					break;
				case 'top':
					this.core.points[0] = e.x;
					this.core.points[1] = e.y-15;
					r.y = e.y - 15;
					r.x = e.x;
					break;
				case 'right':
					this.core.points[0] = e.x + 15;
					this.core.points[1] = e.y;
					r.x = e.x + 15;
					r.y = e.y;
					break;
				case 'bottom':
					this.core.points[0] = e.x;
					this.core.points[1] = e.y + 15;
					r.y = e.y + 15;
					r.x = e.x;
					break;
				default:break;
			}
		}
		this.start = artefact;
		this.startMode = mode;
	}
	setEnd (artefact, mode){
		let n = this.core.points.length,
			r = this.resizers[this.resizers.length - 1],
			e = artefact.core;
		if( mode === 'none'){
			mode = 'left';
		}
		if(e.className === 'Task'){
			switch (mode) {
				case 'left':
					this.core.points[n - 2] = e.x;
					r.x = e.x;
					this.angle = 0;
					break;
				case 'top':
					this.core.points[n - 1] = e.y;
					r.y = e.y;
					this.angle = 270;
					break;
				case 'right':
					this.core.points[n - 2] = e.x + e.width;
					r.x = e.x + e.width;
					this.angle = 180;
					break;
				case 'bottom':
					this.core.points[n - 1] = e.y + e.height;
					r.y = e.y + e.height;
					this.angle = 90;
					break;
				default:break;
			}
		}else{
			switch (mode) {
				case 'left':
					this.core.points[n-2] = e.x-15;
					this.core.points[n-1] = e.y;
					r.x = e.x-15;
					r.y = e.y;
					this.angle = 0;
					break;
				case 'top':
					this.core.points[n-2] = e.x;
					this.core.points[n-1] = e.y-15;
					r.y = e.y - 15;
					r.x = e.x;
					this.angle = 270;
					break;
				case 'right':
					this.core.points[n-2] = e.x + 15;
					this.core.points[n-1] = e.y;
					r.x = e.x + 15;
					r.y = e.y;
					this.angle = 180;
					break;
				case 'bottom':
					this.core.points[n-2] = e.x;
					this.core.points[n-1] = e.y + 15;
					r.y = e.y + 15;
					r.x = e.x;
					this.angle = 90;
					break;
				default:break;
			}
		}
		this.end = artefact;
		this.endMode = mode;
	}
};
