import {loadDiagramType} from '../actions/diagramActions/loadDiagram';
import {newDiagramType} from '../actions/diagramActions/newDiagram';
import {updateDiagramType} from '../actions/diagramActions/updateDiagram';

const diagram = (state=[], {type,diagram}) => {
	switch(type){
		case loadDiagramType:
		case updateDiagramType:
		case newDiagramType: return diagram;
		default: return state;
	}
};
export default diagram;