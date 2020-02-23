export default class EventCore {
	constructor(){
		this.events = {};
	}
	dispatchEvent(type, evt=null){
		let evts = this.events[type];
		if(evts && evts.length>0){
			evts.map(e=>e(evt));
		}
	}
	addEventListener(type,call){
		if(!this.events[type]){
			this.events[type] = [];
		}
		this.events[type].push(call);
	}
	removeEventListener(type, call){
		let evts = this.events[type];
		if(evts){
			evts.remove(call);
		}
		if(evts.length === 0){
			delete this.events[type];
		}
	}
};