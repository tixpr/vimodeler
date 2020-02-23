import Model from './base/Model';
import Process from './map/Process';
import Flow from './map/Flow';
import Label from './map/Label';

//clase de un mapa
export default class ProcessMap extends Model{
	constructor(modelayer,object){
		super(modelayer,object);
		this.className = "ProcessMap";
		this.constructores = {
			"Process": Process,
			"Flow": Flow,
			"Label": Label
		};
	}
	intersectTest(x, y){
		let els = this.artefacts,
			artefact,
			mode = 'none';
		for (let n = els.length - 1; n >= 0; n--){
			if (els[n].className === 'Process' && els[n].hitTest({x:x,y:y})) {
				mode = els[n].intersectTest(x, y);
				artefact = {
					artefact: els[n],
					mode: mode
				};
				break;
			}
		}
		return artefact;
	}
}