import {loadDiagramsType} from '../actions/diagramsActions/loadDiagrams';

const diagrams = (state=[], {type,diagrams}) => {
	switch(type){
		case loadDiagramsType:return diagrams;
		default: return state;
	}
};
export default diagrams;