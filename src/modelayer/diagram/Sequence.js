import Flow from '../map/Flow';

//artefacto de sequencia en diagrama
export default class Sequence extends Flow{
	setStart (artefact, mode){
		let r = this.resizers[0], e = artefact;
		if(mode === 'none'){
			mode = 'right';
		}
		if(e.className === 'Task'){
			switch (mode) {
				case 'left':
					this.points[0].x = e.x;
					r.x = e.x;
					break;
				case 'top':
					this.points[0].y = e.y;
					r.y = e.y;
					break;
				case 'right':
					this.points[0].x = e.x + e.width;
					r.x = e.x + e.width;
					break;
				case 'bottom':
					this.points[0].y = e.y + e.height;
					r.y = e.y + e.height;
					break;
				default:break;
			}
		}else{
			switch (mode) {
				case 'left':
					this.points[0].x = e.x-15;
					this.points[0].y = e.y;
					r.x = e.x-15;
					r.y = e.y;
					break;
				case 'top':
					this.points[0].x = e.x;
					this.points[0].y = e.y-15;
					r.y = e.y - 15;
					r.x = e.x;
					break;
				case 'right':
					this.points[0].x = e.x + 15;
					this.points[0].y = e.y;
					r.x = e.x + 15;
					r.y = e.y;
					break;
				case 'bottom':
					this.points[0].x = e.x;
					this.points[0].y = e.y + 15;
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
		let n = this.points.length,
			r = this.resizers[this.resizers.length - 1],
			e = artefact;
		if( mode === 'none'){
			mode = 'left';
		}
		if(e.className === 'Task'){
			switch (mode) {
				case 'left':
					this.points[n -1].x = e.x;
					r.x = e.x;
					this.angle = 0;
					break;
				case 'top':
					this.points[n - 1].y = e.y;
					r.y = e.y;
					this.angle = 270;
					break;
				case 'right':
					this.points[n - 1].x = e.x + e.width;
					r.x = e.x + e.width;
					this.angle = 180;
					break;
				case 'bottom':
					this.points[n - 1].y = e.y + e.height;
					r.y = e.y + e.height;
					this.angle = 90;
					break;
				default:break;
			}
		}else{
			switch (mode) {
				case 'left':
					this.points[n-1].x = e.x-15;
					this.points[n-1].y = e.y;
					r.x = e.x-15;
					r.y = e.y;
					this.angle = 0;
					break;
				case 'top':
					this.points[n-1].x = e.x;
					this.points[n-1].y = e.y-15;
					r.y = e.y - 15;
					r.x = e.x;
					this.angle = 270;
					break;
				case 'right':
					this.points[n-1].x = e.x + 15;
					this.points[n-1].y = e.y;
					r.x = e.x + 15;
					r.y = e.y;
					this.angle = 180;
					break;
				case 'bottom':
					this.points[n-1].x = e.x;
					this.points[n-1].y = e.y + 15;
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
