let element_id = 1,
	model_id = 1,
	mouse_move = function(e){
		let ml = window.__modelayer;
		if(ml){
			//console.info(ml.artefact);
			e.preventDefault();
			let mx = e.movementX || e.mozMovementX || 0,
				my = e.movementY || e.mozMovementY || 0;
			if (ml.artefact.dragging) {
				ml.artefact.dispatchEvent('dragmove', {x: mx, y:my});
			} else {
				ml.artefact.dispatchEvent('dragstart', {x: mx, y:my});
			}
			return false;
		}
	};
Array.prototype.remove = Array.prototype.remove || 
						function(e) {
							let i = this.indexOf(e);
							if (i > -1) {
								this.splice(i, 1);
								return true;
							} else {
								//console.error('El artefacto no existe dentro del array');
								return false;
							}
						};
class MyBase {
	constructor(){
		this.events = {};
	}
	dispatchEvent(type, evt=null){
		let evts = this.events[type];
		if(evts && evts.length>0){
			for(let i = 0,n = evts.length; i<n;i++){
				evts[i](evt);
			}
		}else{
			//console.error('No existe ningun registro para este tipo de evento');
		}
	}
	addEventListener(type,callback){
		if(!this.events[type]){
			this.events[type] = [];
		}
		this.events[type].push(callback);
	}
	removeEventListener(type, callback){
		let evts = this.events[type];
		if(evts){
			evts.remove(callback);
		}
		if(evts.length === 0){
			delete this.events[type];
		}
	}
}
class Modelayer extends MyBase{
	constructor(cvs) {
		super();
		if(cvs.getContext){
			this.cvs = cvs;
			this.ctx = cvs.getContext('2d');
			this.temp_ctx = document.createElement('canvas').getContext('2d');
			this.cvs.addEventListener('mousedown',(e)=>this.mouseDown(e),false);
			this.cvs.addEventListener('mouseup',(e)=>this.mouseUp(e),false);
			this.cvs.addEventListener('dragover',(e)=>this.dragOver(e),false);
			this.cvs.addEventListener('dragleave',(e)=>this.dragLeave(e),false);
			this.cvs.addEventListener('drop',(e)=>this.drop(e),false);
			this.className = 'Modelayer';
			this.models = [];
			this._model = null;
			this._artefact = null;
			window.__modelayer = this;
		}else{
			console.error('Su navegador no soporta Canvas, actualizar a la ultima versión estable disponible');
		}
	}
	set model(v){
		if(this.models.indexOf(v)>-1){
			this._model = v;
			v.draw();
		}else{
			console.error("el modelo proporcionado no se encuentra dentro de los modelos del Modelador");
		}
	}
	get model(){
		return this._model;
	}
	set artefact(v){
		this._artefact=v;
	}
	get artefact(){
		return this._artefact;
	}
	mouseDown(e){
		e.preventDefault();
		let point = {
			x: e.layerX,
			y: e.layerY
		};
		let artefact = this.model.hitTest(point);
		if(artefact){
			this.artefact = artefact;
			this.cvs.addEventListener('mousemove',mouse_move,false);
		}else{
			let opt = false;
			if(this.artefact && this.model.artefact){
				opt = true;
			}
			delete this.artefact;
			delete this.model.artefact;
			if(opt){
				this.model.draw();
			}
		}
		return false;
	}
	mouseUp(e){
		e.preventDefault();
		let artefact = this.artefact;
		let mx = e.movementX || e.mozMovementX || 0,
			my = e.movementY || e.mozMovementY || 0;
		if(artefact){
			if(artefact.dragging){
				artefact.dispatchEvent('dragend',{x:mx, y:my});
				this.model.artefact = artefact;
				this.model.draw();
			} else {
				artefact.dispatchEvent('click',{x:mx,y:my});
				this.model.artefact = artefact;
				this.model.draw();
			}
		}else{
			console.info('artefacto no seleccionado');
		}
		this.cvs.removeEventListener('mousemove',mouse_move);
		return false;
	}
	dragOver(e){
		//console.info('drag over');
		e.preventDefault();
		//this.cvs.classList.add('dragover');
		return false;
	}
	dragLeave(e){
		//console.info('drag leave');
		e.preventDefault();
		//this.cvs.classList.remove('dragover');
		return false;
	}
	drop(e){
		//console.info('drop');
		e.preventDefault();
		let data = e.dataTransfer.getData('text'), cn = null;
		switch(data){
			case 'Process':cn=Process;break;
			case 'Flow':cn=Flow;break;
			case 'Label':cn=Label;break;
			case 'Task':cn=Task;break;
			case 'StartEvent':cn=StartEvent;break;
			case 'IntermediateEvent':cn=IntermediateEvent;break;
			case 'EndEvent':cn=EndEvent;break;
			case 'Sequence':cn=Sequence;break;
			case 'Gateway':cn=Gateway;break;
			default:break;
		}
		if(cn){
			let artefact_new = new cn(this.model,{name:data,x:e.layerX,y:e.layerY});
			this.model.addArtefact(artefact_new);
		}else{
			console.error('Elemento desconocido');
		}
	}
	addProcessMap(name){
		let map = new ProcessMap(this,{name:name});
		this.models.push(map);
		this.model = map;
		this.cvs.setAttribute('width', window.screen.width+'px');
		this.cvs.setAttribute('height', window.screen.height+'px');
		window.__toolbox.setMode("map");
		//return map;
	}
	addProcessDiagram(name){
		let diagram = new ProcessDiagram(this,{name:name});
		this.models.push(diagram);
		this.model = diagram;
		this.cvs.setAttribute('width', window.screen.width+'px');
		this.cvs.setAttribute('height', window.screen.height+'px');
		window.__toolbox.setMode("diagram");
		//return diagram;
	}
	addProject(name){
		console.info('creando un proyecto de modelado de procesos');
	}
	canvasResize(dimension){
		//console.info('resize');
		//console.info(dimension);
		if(this.cvs.clientWidth<dimension.width){
			this.cvs.setAttribute('width', dimension.width+'px');
		}
		if(this.cvs.clientHeight<dimension.height){
			this.cvs.setAttribute('height', dimension.height+'px');
		}
		this.model.draw();
	}
	openFile(file){
	}
}
class Model{
	constructor(parent, object){
		this.parent = parent;
		this.cvs = parent.cvs;
		this.ctx = parent.ctx;
		this.temp_ctx = parent.temp_ctx;
		this.artefacts = [];
		this._artefact = null;
		this.core = object;
		this.sub_models = {};
		if(this.core!==null){
			this.core.id = this.core.id || 'model-'+model_id++;
		}
	}
	set artefact(v){
		if(this.artefacts.remove(v)){
			this.artefacts.push(v);
			this._artefact = v;
			this.parent.artefact = v;
			v.draw(this.ctx);
		}
	}
	get artefact(){
		return this._artefact;
	}
	addArtefact(artefact){
		this.artefacts.push(artefact);
		this._artefact = artefact;
		this.parent.artefact = artefact;
		artefact.draw(this.ctx);
	}																																																																																																																																																																										
	clear(x, y, width, height){
		let px = x || 0,
			py = y || 0,
			w = width || this.cvs.width,
			h = height || this.cvs.height;
		this.ctx.clearRect(px, py, w, h);
	}
	drawBase(){
		this.ctx.fillStyle = '#ffffff';
		this.ctx.strokeStyle = '#ffffff';
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.cvs.width, this.cvs.height);
		this.ctx.fill();
		this.ctx.stroke();
	}
	draw(){
		this.clear();
		//this.drawBase();
		for(let i = 0, l = this.artefacts.length; i<l; i++){
			this.artefacts[i].draw(this.ctx);
		}
		if(this.artefact && this.artefact.resizers){
			this.artefact.drawResizers(this.ctx);
		}
	}
	hitTest(point){
		let e;
		if(this.artefact && this.artefact.resizers){
			let r = this.artefact.resizers;
			for (let ae = r.length - 1; ae >= 0; ae--) {
				if (r[ae].hitTest(point, this.artefact.getPosition())) {
					e = r[ae];
					break;
				}
			}
		}
		if (!e) {
			let i = this.artefacts.length - 1,
				artefact = this.artefacts[i--];
			while(artefact){
				if (artefact.hitTest(point)) {
					e = artefact;
					break;
				}
				artefact = this.artefacts[i--];
			}
		}
		return e;
	}
	intersecTest(x, y){
		console.error("Método intersectTest no a sido especificado");
	}
	set name(v){
		this.core.name = v;
	}
	get name(){
		return this.core.name;
	}
	set id(v){
		this.core.id = v;
	}
	get id(){
		return this.core.id;
	}
}
//clase de un mapa
class ProcessMap extends Model{
	constructor(modelayer,object){
		super(modelayer,object);
		this.className = "ProcessMap";
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
//clase de un diagrama
class ProcessDiagram extends Model{
	constructor(modelayer, object){
		super(modelayer,object);
		this.className = 'ProcessDiagram';
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
}
//clase base de todos los artefactos
class Artefact extends MyBase{
	constructor(model, object){
		if(model){
			super();
			this.parent = model;
			this.ctx = model.ctx;
			this.temp_ctx = model.temp_ctx;
			this.core = object;
			this.dragging = false;
			this.alter_elements = false;
			if(this.core !== null){
				this.core.id = this.core.id || 'element-'+element_id++;
				this.fontDimension(this.temp_ctx);
			}
			this.addEventListener('dragmove', (e)=>this.dragMove(e));
			this.addEventListener('dragstart', (e)=>this.dragStart(e));
			this.addEventListener('dragend', (e)=>this.dragEnd(e));
		}else{
			console.error("Modelo no proporcionado");
		}
	}
	drag(e){
		// Manejar artefact evento drag en todos los elementos dentro del modelo
		let mx = e.x || 0,
			my = e.y || 0;
		if (this.alter_elements) {
			//console.info('alterando elementos desde alter_elements');
			this.alterElements(mx, my);
		} else {
			this.x += mx;
			this.y += my;
			if (this.alterElements) {
				//console.info('alterando elementos desde alterElements');
				this.alterElements(mx, my);
			}
		}
		this.parent.draw();
	}
	dragStart(e){
		this.dragging = true;
		this.parent.artefact = this;
		this.drag(e);
	}
	dragMove(e){
		this.drag(e);
	}
	dragEnd(e){
		this.dragging = false;
		if(this.artefact && this.artefact.dragEndFlow){
			this.artefact.dragEndFlow();
			this.parent.draw();
		}
	}
	set fontSize(v){
		this.core.fontSize = v;
		this.fontDimension(this.temp_ctx);
		this.parent.draw();
	}
	get fontSize(){
		return this.core.fontSize || 12;
	}
	set fontStyle(v){
		this.core.fontStyle = v;
		this.fontDimension(this.temp_ctx);
		this.parent.draw();
	}
	get fontStyle(){
		return this.core.fontStyle || '';
	}
	set fontFill(v){
		this.core.fontFill = v;
		this.parent.draw();
	}
	get fontFill(){
		return this.core.fontFill || '#000';
	}
	set fontFamily(v){
		this.core.fontFamily = v;
		this.fontDimension(this.temp_ctx);
		this.parent.draw();
	}
	get fontFamily(){
		return this.core.fontFamily || 'arial';
	}
	get font(){
		return this.fontStyle + ' ' + this.fontSize + 'px ' + this.fontFamily;
	}
	set name(v){
		this.core.name = v;
		this.fontDimension(this.temp_ctx);
		this.parent.draw();
	}
	get name(){
		return this.core.name || '';
	}
	set className(v=null){
		this.core.className = v;
	}
	get className(){
		return this.core.className || '';
	}
	set x(v){
		this.core.x = v;
		this.parent.draw();
	}
	get x(){
		return this.core.x;
	}
	set y(v){
		this.core.y = v;
		this.parent.draw();
	}
	get y(){
		return this.core.y;
	}
	fontDimension(ctx){
		//console.info(me);
		ctx.save();
		this.applyStyle(ctx);
		let ts = this.name.split('\n'),
			t = 0,
			w = 0,
			h = this.fontSize;
		this.fontLine = ts.length;
		for (let i = 0, n = ts.length; i < n; i++) {
			t = ctx.measureText(ts[i]).width;
			if (t > w) {
				w = t;
			}
			h += this.fontSize;
		}
		h -= this.fontSize;
		this.fontWidth = w;
		this.fontHeight = h;
		ctx.restore();
	}
	draw(ctx){
		console.error("Función draw no implementada en el artefacto");
	}
	applyStyle(ctx){
		console.error("No se especifico el estilo del artefacto");
	}
	getPosition(){
		return {
			x:this.x,
			y:this.y
		};
	}
	hitTest(point){
		this.draw(this.temp_ctx);
		return this.temp_ctx.isPointInPath(point.x,point.y);
	}
}
//clase para redimensionar un artefacto
class Resizer extends Artefact{
	constructor(artefact, model, x, y, callback, extra = null){
		super(model,{});
		this.artefact = artefact;
		this.callback = callback;
		this.alter_elements = true;
		this.className = 'Resizer';
		this.x = x;
		this.y = y;
		if(extra){
			this.extra = extra;
		}
	}
	alterElements(mx, my){
		if (this.extra) {
			this.artefact[this.callback](mx, my, this.extra);
		} else {
			this.artefact[this.callback](mx, my);
		}
	}
	applyStyle(ctx, x, y){
		ctx.fillStyle = '#eaffb2';
		ctx.strokeStyle = '#778851';
		ctx.lineWidth = 1;
		ctx.translate(x, y);
		//ctx.transform(1, 0, 0, 1, x, y);
	}
	draw(ctx, point){
		ctx.save();
		this.applyStyle(ctx, point.x, point.y);
		ctx.beginPath();
		ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	hitTest(one_point, two_point){
		this.draw(this.temp_ctx, two_point);
		return this.temp_ctx.isPointInPath(one_point.x, one_point.y);
	}
	getPosition(){
		return {
			x:this.x,
			y:this.y
		};
	}
}
/*
 *
 * MAPA
 * 
 */
//artefacto proceso de un mapa
class Process extends Artefact{
	constructor(map, object){
		super(map, object);
		let w = this.width,
			h = this.height;
		this.core.x = this.x - w/2;
		this.core.y = this.y - h/2;
		this.lwidth = w - 10;
		this.className = 'Process';
		this.inputs = {};
		this.outputs = {};
		let temp_resizers = [];
		//redimensionador 1
		let r = new Resizer(this, map, 0, 0, 'alterTopLeft');
		temp_resizers.push(r);
		r = new Resizer(this, map, w, 0, 'alterTopRight');
		temp_resizers.push(r);
		r = new Resizer(this, map, w, h, 'alterBottomRight');
		temp_resizers.push(r);
		r = new Resizer(this, map, 0, h, 'alterBottomLeft');
		temp_resizers.push(r);
		this.resizers = temp_resizers;
		this.addEventListener('dragstart',(e)=>this.dragResize(e),false);
		this.addEventListener('dragmove',(e)=>this.dragResize(e),false);
		this.addEventListener('dragend',(e)=>this.dragResize(e),false);
	}
	get lx(){
		return this.width/2;
	}
	get ly(){
		return this.height/2;
	}
	set width(val){
		this.core.width = val;
		this.parent.draw();
	}
	get width(){
		let r = this.core.width || 100;
		return r;
	}
	set height(val){
		this.core.height = val;
		this.parent.draw();
	}
	get height(){
		return this.core.height || 60;
	}
	dragResize(e){
		let dimension = {width:0,height:0};
		dimension.width = this.x + this.width;
		dimension.height = this.y + this.height;
		window.__modelayer.canvasResize(dimension);
	}
	addInput(flow, mode){
		this.inputs[mode] = this.inputs[mode] || [];
		this.inputs[mode].push(flow);
	}
	removeInput(flow, mode){
		let i = this.inputs[mode];
		if (i) {
			i.remove(flow);
		}
	}
	addOutput(flow, mode){
		this.outputs[mode] = this.outputs[mode] || [];
		this.outputs[mode].push(flow);
	}
	removeOutput(flow, mode){
		let o = this.outputs[mode];
		if (o) {
			o.remove(flow);
		}
	}
	alterTopLeft (mx, my){
		this.x += mx;
		this.width -= mx;
		this.y += my;
		this.height -= my;
		this.alterTopLeftElements(mx, my);
		this.alterResizers();
	}
	alterTopRight (mx, my){
		this.width += mx;
		this.y += my;
		this.height -= my;
		this.alterTopRightElements(mx, my);
		this.alterResizers();
	}
	alterBottomRight (mx, my){
		this.width += mx;
		this.height += my;
		this.alterBottomRightElements(mx, my);
		this.alterResizers();
	}
	alterBottomLeft (mx, my){
		this.x += mx;
		this.width -= mx;
		this.height += my;
		this.alterBottomLeftElements(mx, my);
		this.alterResizers();
	}
	alterTopLeftElements (mx, my){
		let il = this.inputs.left,
			it = this.inputs.top,
			ol = this.outputs.left,
			ot = this.outputs.top,
			n = -1;
		if (il) {
			for (n = il.length - 1; n >= 0; n--) {
				il[n].moveEndPoint(mx, 0);
			}
		}
		if (it) {
			for (n = it.length - 1; n >= 0; n--) {
				it[n].moveEndPoint(0, my);
			}
		}
		if (ol) {
			for (n = ol.length - 1; n >= 0; n--) {
				ol[n].moveStartPoint(mx, 0);
			}
		}
		if (ot) {
			for (n = ol.length - 1; n >= 0; n--) {
				ot[n].moveStartPoint(0, my);
			}
		}
	}
	alterTopRightElements (mx, my){
		let ir = this.inputs.right,
			it = this.inputs.top,
			or = this.outputs.right,
			ot = this.outputs.top,
			n = -1;
		if (ir) {
			for (n = ir.length - 1; n >= 0; n--) {
				ir[n].moveEndPoint(mx, 0);
			}
		}
		if (it) {
			for (n = it.length - 1; n >= 0; n--) {
				it[n].moveEndPoint(0, my);
			}
		}
		if (or) {
			for (n = or.length - 1; n >= 0; n--) {
				or[n].moveStartPoint(mx, 0);
			}
		}
		if (ot) {
			for (n = ot.length - 1; n >= 0; n--) {
				ot[n].moveStartPoint(0, my);
			}
		}
	}
	alterBottomRightElements (mx, my){
		let ir = this.inputs.right,
			ib = this.inputs.bottom,
			or = this.outputs.right,
			ob = this.outputs.bottom,
			n = -1;
		if (ir) {
			for (n = ir.length - 1; n >= 0; n--) {
				ir[n].moveEndPoint(mx, 0);
			}
		}
		if (ib) {
			for (n = ib.length - 1; n >= 0; n--) {
				ib[n].moveEndPoint(0, my);
			}
		}
		if (or) {
			for (n = or.length - 1; n >= 0; n--) {
				or[n].moveStartPoint(mx, 0);
			}
		}
		if (ob) {
			for (n = ob.length - 1; n >= 0; n--) {
				ob[n].moveStartPoint(0, my);
			}
		}
	}
	alterBottomLeftElements (mx, my){
		let il = this.inputs.left,
			ib = this.inputs.bottom,
			ol = this.outputs.left,
			ob = this.outputs.bottom,
			n = -1;
		if (il) {
			for (n = il.length - 1; n >= 0; n--) {
				il[n].moveEndPoint(mx, 0);
			}
		}
		if (ib) {
			for (n = ib.length - 1; n >= 0; n--) {
				ib[n].moveEndPoint(0, my);
			}
		}
		if (ol) {
			for (n = ol.length - 1; n >= 0; n--) {
				ol[n].moveStartPoint(mx, 0);
			}
		}
		if (ob) {
			for (n = ob.length - 1; n >= 0; n--) {
				ob[n].moveStartPoint(0, my);
			}
		}
	}
	applyStyle(ctx){
		ctx.fillStyle = '#eceef7';
		ctx.strokeStyle = '#434343';
		ctx.lineWidth = 1;
		//ctx.transform(1, 0, 0, 1, this.x, this.y);
		ctx.translate(this.x,this.y);
	}
	draw(ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.rect(0, 0, this.width, this.height);
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = this.fontFill;
		ctx.font = this.font;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.transform(1, 0, 0, 1, this.lx, this.ly);
		let ts = this.name.split('\n'),
			h = -this.fontHeight / this.fontLine;
		if (ts.length > 1) {
			for (let i = 0, n = ts.length; i < n; i++) {
				ctx.fillText(ts[i], 0, h);
				h += this.fontsize;
			}
		} else {
			ctx.fillText(ts[0], 0, 0);
		}
		ctx.restore();
	}
	drawResizers(ctx){
		for (let n = this.resizers.length - 1; n >= 0; n--) {
			this.resizers[n].draw(ctx, this.getPosition());
		}
	}
	alterResizers(){
		this.resizers[1].x = this.width;
		this.resizers[2].x = this.width;
		this.resizers[2].y = this.height;
		this.resizers[3].y = this.height;
	}
	intersectTest(px, py){
		//console.info('x->'+ obj.x + ', y->' + obj.y + '; width->' + obj.width + ', height->' + obj.height);
		let x = this.x,
			y = this.y,
			xw = this.x + this.width,
			yh = this.y + this.height;
		if (px > x && px < x + 10 && py > y + 10 && py < yh - 10) {
			return 'left';
		} else if (px > x + 10 && px < xw - 10 && py > y && py < y + 10) {
			return 'top';
		} else if (px > xw - 10 && px < xw && py > y - 10 && py < yh - 10) {
			return 'right';
		} else if (px > x + 10 && px < xw - 10 && py > yh - 10 && py < yh) {
			return 'bottom';
		} else {
			return 'none';
		}
	}
	alterElements(mx, my){
		let m, ia, oa;
		for (m in this.inputs) {
			ia = this.inputs[m];
			for (let i = ia.length - 1; i >= 0; i--) {
				ia[i].moveEndPoint(mx, my);
			}
		}
		for (m in this.outputs) {
			oa = this.outputs[m];
			for (let j = oa.length - 1; j >= 0; j--) {
				oa[j].moveStartPoint(mx, my);
			}
		}
	}
}
//artefacto flujo de un mapà
class Flow extends Artefact{
	constructor(map, object){
		super(map, object);
		this.core.points = this.core.points || [this.x-50, this.y, this.x+50, this.y];
		this.className = 'Flow';
		this.x = 0;
		this.y = 0;
		let mx = this.points[0] + 50,
			my = this.points[1] + 10;
		this.text = new Label(map, {name:this.name,x:mx, y:my},this);
		this.parent.addArtefact(this.text);
		let temp_resizers = [];
		//variable que controla que punto se a movido
		//0->no se mueve ningun punto
		//1->se mueve artefact punto inicial (start)
		//2->se mueve artefact punto final (end)
		this.mov_point = 0;
		if ((this.points.length) / 2 === 2) {
			//redimensionador 1
			let r = new Resizer(this, map, this.points[0], this.points[1], 'moveStartPoint');
			r.addEventListener('dragend', (e)=>this.dragEndResizer(e));
			temp_resizers.push(r);
			//redimensionador 2
			r = new Resizer(this, map, this.points[2], this.points[3], 'moveEndPoint');
			r.addEventListener('dragend', (e)=>this.dragEndResizer(e));
			temp_resizers.push(r);
			this.resizers = temp_resizers;
		} else {
			let r = new Resizer(this, map, object.points[0], object.points[1], 'moveStartPoint'),
				n = this.points.length - 2;
			r.addEventListener('dragend', (e)=>this.dragEndResizer(e));
			temp_resizers.push(r);
			for (let j = 2; j < n; j += 2) {
				r = new Resizer(this, map, object.points[j], object.points[j + 1], 'movePoint', j);
				temp_resizers.push(r);
			}
			r = new Resizer(this, map, object.points[n], object.points[n + 1], 'moveEndPoint');
			r.addEventListener('dragend', (e)=>this.dragEndResizer(e));
			temp_resizers.push(r);
			this.resizers = temp_resizers;
		}
	}
	set points(val){
		this.core.points = val;
		this.parent.draw();
	}
	get points(){
		return this.core.points;
	}
	set angle(val){
		this.core.angle = val;
		this.parent.draw();
	}
	get angle(){
		return this.core.angle || 0;
	}
	setStart (art, mode){
		let r = this.resizers[0];
		switch (mode) {
			case 'left':
				this.points[0] = art.x;
				r.x = art.x;
				break;
			case 'top':
				this.points[1] = art.y;
				r.y = art.y;
				break;
			case 'right':
				this.points[0] = art.x + art.width;
				r.x = art.x + art.width;
				break;
			case 'bottom':
				this.points[1] = art.y + art.height;
				r.y = art.y + art.height;
				break;
			default: break;
		}
		this.start = art;
		this.startMode = mode;
	}
	setEnd (artefact, mode){
		let n = this.points.length,
			r = this.resizers[this.resizers.length - 1],
			e = artefact;
		switch (mode) {
			case 'left':
				this.points[n - 2] = e.x;
				r.x = e.x;
				this.angle = 0;
				break;
			case 'top':
				this.points[n - 1] = e.y;
				r.y = e.y;
				this.angle = 270;
				break;
			case 'right':
				this.points[n - 2] = e.x + e.width;
				r.x = e.x + e.width;
				this.angle = 180;
				break;
			case 'bottom':
				this.points[n - 1] = e.y + e.height;
				r.y = e.y + e.height;
				this.angle = 90;
				break;
			default:break;
		}
		this.end = artefact;
		this.endMode = mode;
	}
	applyStyle (ctx){
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#000';
		ctx.fillStyle = '#000';
		ctx.lineCap = 'square';
		ctx.translate(this.x, this.y);
	}
	draw(ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		let i = 0,
			n = this.points.length,
			point = this.points;
		ctx.moveTo(point[0], point[1]);
		for (i = 2; i < n-1; i += 2) {
			ctx.lineTo(point[i], point[i + 1]);
		}
		//ctx.lineTo(mx,my);
		let mx = point[i - 2],
			my = point[i - 1];
		switch (this.angle) {
			case 0:
				ctx.lineTo(mx-7,my);
				ctx.moveTo(mx,my);
				ctx.lineTo(mx - 9, my - 7);
				ctx.lineTo(mx - 9, my + 7);
				ctx.lineTo(mx, my);
				break;
			case 90:
				ctx.lineTo(mx,my+7);
				ctx.moveTo(mx,my);
				ctx.lineTo(mx - 7, my + 9);
				ctx.lineTo(mx + 7, my + 9);
				ctx.lineTo(mx, my);
				break;
			case 180:
				ctx.lineTo(mx+7,my);
				ctx.moveTo(mx,my);
				ctx.lineTo(mx + 9, my - 7);
				ctx.lineTo(mx + 9, my + 7);
				ctx.lineTo(mx, my);
				break;
			case 270:
				ctx.lineTo(mx,my-7);
				ctx.moveTo(mx,my);
				ctx.lineTo(mx + 7, my - 9);
				ctx.lineTo(mx - 7, my - 9);
				ctx.lineTo(mx, my);
				break;
			default:
				console.error('angulo no especificado en artefact flujo');
		}
		//ctx.fill();
		//ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
	drawResizers (ctx){
		for (let n = this.resizers.length - 1; n >= 0; n--) {
			this.resizers[n].draw(ctx, this.getPosition());
		}
	}
	hitTest (point){
		this.draw(this.temp_ctx);
		return this.temp_ctx.isPointInStroke(point.x, point.y) || this.temp_ctx.isPointInPath(point.x, point.y);
	}
	dragEndFlow(){
		let ps = this.points,
			r = this.resizers;
		for (let i = 0, n = ps.length; i < n; i += 2) {
			ps[i] += this.x;
			ps[i + 1] += this.y;
		}
		for (let j = 0, m = r.length; j < m; j++) {
			r[j].x += this.x;
			r[j].y += this.y;
		}
		this.x = 0;
		this.y = 0;
		/*
		if (this.start) {
			this.start.removeOutput(this, this.startMode);
			delete this.start;
			delete this.startMode;
		}
		if (this.end) {
			this.end.removeInput(this, this.endMode);
			delete this.end;
			delete this.endMode;
			this.angle = 0;
		}
		*/
	}
	dragEndResizer(){
		let r = this.resizers, point;
		switch (this.mov_point) {
			case 1:
				point = this.parent.intersectTest(r[0].x, r[0].y);
				let pr = this.start;
				if (pr) {
					pr.removeOutput(this, this.startMode);
					delete this.start;
					delete this.startMode;
				}
				if (point) {
					this.setStart(point.artefact, point.mode);
					point.artefact.addOutput(this, point.mode);
					this.parent.draw();
				} else {
					//console.info('ningun elemento dentro del drag->start');
				}
				break;
			case 2:
				point = this.parent.intersectTest(r[r.length - 1].x, r[r.length - 1].y);
				let pe = this.end;
				if (pe) {
					pe.removeInput(this, this.endMode);
					delete this.end;
					delete this.endMode;
				}
				if (point) {
					this.setEnd(point.artefact, point.mode);
					point.artefact.addInput(this, point.mode);
					this.parent.draw();
				} else {
					//console.info('ningun proceso dentro del drag->end');
				}
				break;
			default:break;
		}
	}
	moveEndPoint (mx, my){
		let point = this.points;
		let n = point.length;
		point[n - 2] += mx;
		point[n - 1] += my;
		let r = this.resizers[this.resizers.length - 1];
		r.x += mx;
		r.y += my;
		this.mov_point = 2;
	}
	moveStartPoint (mx, my){
		let point = this.points;
		point[0] += mx;
		point[1] += my;
		let r = this.resizers[0];
		r.x += mx;
		r.y += my;
		this.mov_point = 1;
	}
	movePoint (mx, my, two_point){
		// moviento un punto entre artefact inicio y final
		let r = this.resizers[two_point / 2],
			point = this.points;
		point[two_point] += mx;
		point[two_point + 1] += my;
		r.x += mx;
		r.y += my;
	}
	alterElements (mx, my){
		this.text.x += mx;
		this.text.y += my;
	}
	toJSON(){
		return JSON.stringify(this.core);
	}
}
//artefcto texto de un mapa
class Label extends Artefact{
	constructor(map, object, artefact=null){
		super(map, object);
		this.className = 'Label';
		this.lx = this.fontWidth / 2;
		this.ly = this.fontHeight / 2;
		this.parent_artefact = artefact;
	}
	applyStyle (ctx){
		ctx.fillStyle = this.fontfill;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.translate(this.x, this.y);
		ctx.font = this.font;
	}
	toJSON(){
		return JSON.stringify(this.core);
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		let ts = this.name.split('\n'),
			h = -this.fontheight / this.fontline;
		if (ts.length > 1) {
			for (let i = 0, n = ts.length; i < n; i++) {
				ctx.fillText(ts[i], 0, h, this.fontwidth);
				h += this.fontsize;
			}
		} else {
			ctx.fillText(ts[0], 0, 0, this.fontwidth);
		}
		ctx.restore();
	}
	hitTest (point){
		let vx = this.x - this.lx,
			vy = this.y - this.ly,
			w = vx + this.fontWidth,
			h = vy + this.fontHeight;
		//console.info('x->' + vx + ', y->' + vy + ', w->' + w + ', h->' + h);
		if (point.x <= w && point.x >= vx && point.y >= vy && point.y <= h) {
			return true;
		} else {
			return false;
		}
	}
}
/*
 *
 * DIAGRAMA
 * 
 */
//artefacto de tarea de un diagrama
class Task extends Process{
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
}
//artefacto de sequencia en diagrama
class Sequence extends Flow{
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
}
//clase base de los artefactos evento
class EventArtefact extends Artefact{
	constructor  (diagram, object){
		super(diagram, object);
		this.inputs = {};
		this.outputs = {};
		this.text = new Label(diagram, {name:this.name,x:this.x, y:this.y+30},this);
		this.parent.addArtefact(this.text);
	}
	addInput (artefact, mode){
		this.inputs[mode] = this.inputs[mode] || [];
		this.inputs[mode].push(artefact);
	}
	removeInput (artefact, mode){
		let i = this.inputs[mode];
		if(i){
			i.remove(artefact);
		}
	}
	addOutput (artefact, mode){
		this.outputs[mode] = this.outputs[mode] || [];
		this.outputs[mode].push(artefact);
	}
	removeOutput (artefact, mode){
		let o = this.outputs[mode];
		if(o){
			o.remove(artefact);
		}
	}
	intersectTest (px, py){
		let e = this.core;
		let x = e.x,
			y = e.y;
		if(x-15<px && px<x-5 && y-5<py && py < y+5){
			return 'left';
		}else if(x-5<px && px<x+5 && y-15<py && py < y-5){
			return 'top';
		}else if(x+5<px && px<x+15 && y-5<py && py < y+5){
			return 'right';
		}else if(x-5<px && px<x+5 && y+5<py && py < y+15){
			return 'bottom';
		}else{
			return 'none';
		}
	}
	alterElements (mx, my){
		let m = '', e = 0, i = 0;
		this.text.x += mx;
		this.text.y += my;
		for(m in this.inputs) {
			e = this.inputs[m];
			for(i = e.length - 1; i >= 0; i--){
				e[i].moveEndPoint(mx,my);
			}
		}
		for (m in this.outputs) {
			e = this.outputs[m];
			for(i = e.length - 1; i >= 0; i--){
				e[i].moveStartPoint(mx,my);
			}
		}
	}
}
//artefacto evento de inicio de un diagrama
class StartEvent extends EventArtefact{
	constructor (diagram, object){
		super(diagram, object);
		this.className = 'StartEvent';
	}
	applyStyle (ctx){
		ctx.fillStyle = '#eeffaf';
		ctx.strokeStyle = '#799a45';
		ctx.lineWidth = 2;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.arc(this.core.x, this.core.y, 15, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}
//artefacto evento intermedio de un diagrama
class IntermediateEvent extends EventArtefact {
	constructor (diagram, object){
		super(diagram, object);
		this.className = 'IntermediateEvent';
	}
	applyStyle (ctx){
		ctx.fillStyle = '#fefcf4';
		ctx.strokeStyle = '#928d43';
		ctx.lineWidth = 2;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.arc(this.core.x, this.core.y, 15, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}
//artefacto evento de finalización de un diagrama
class EndEvent extends EventArtefact {
	constructor (diagram, object){
		super(diagram, object);
		this.className = 'EndEvent';
	}
	applyStyle (ctx){
		ctx.fillStyle = '#fcc9c8';
		ctx.strokeStyle = '#840e1b';
		ctx.lineWidth = 2;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.arc(this.core.x, this.core.y, 15, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
}
//artefacto compuerta de un diagrama
class Gateway extends EventArtefact {
	constructor (diagram, object){
		super(diagram, object);
		this.className = 'Gateway';
	}
	applyStyle (ctx){
		ctx.fillStyle = '#fffeb9';
		ctx.strokeStyle = '#adc61c';
		ctx.lineWidth = 3;
	}
	draw (ctx){
		ctx.save();
		this.applyStyle(ctx);
		ctx.beginPath();
		ctx.moveTo(this.core.x-15,this.core.y);
		ctx.lineTo(this.core.x, this.core.y-15);
		ctx.lineTo(this.core.x+15, this.core.y);
		ctx.lineTo(this.core.x, this.core.y+15);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
}

export {
	ProcessMap,ProcessDiagram,Process,Flow,Label,
	Task,Sequence,EventArtefact,StartEvent,
	IntermediateEvent,EndEvent,Gateway
};

export default Modelayer;