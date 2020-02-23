import Model from './base/Model';
import Task from './diagram/Task';
import StartEvent from './diagram/StartEvent';
import IntermediateEvent from './diagram/IntermediateEvent';
import EndEvent from './diagram/EndEvent';
import Sequence from './diagram/Sequence';
import Gateway from './diagram/Gateway';


//clase de un diagrama
export default class ProcessDiagram extends Model{
	constructor(modelayer, object){
		super(modelayer,object);
		this.className = 'ProcessDiagram';
		this.constructores = {
			"Task": Task,
			"StartEvent": StartEvent,
			"IntermediateEvent": IntermediateEvent,
			"EndEvent": EndEvent,
			"Sequence": Sequence,
			"Gateway": Gateway
		};
		this.intersects = [
			'Task',
			'StartEvent',
			'IntermediateEvent',
			'EndEvent',
			'Gateway'
		];
	}
	intersectTest(x, y){
		let els = this.artefacts,
			artefact,
			mode = 'none';
		for(let n = els.length-1; n>=0; n--){
			if(this.intersects.indexOf(els[n].className)>-1 && els[n].hitTest({x:x,y:y})){
				mode = els[n].intersectTest(x,y);
				artefact = {
					artefact: els[n],
					mode: mode
				};
				break;
			}
		}
		return artefact;
	}
	
};