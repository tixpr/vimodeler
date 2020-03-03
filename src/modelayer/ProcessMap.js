import Model from './base/Model';


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
		
	}
}