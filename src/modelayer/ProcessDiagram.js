import Model from './base/Model';



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
	
	
};