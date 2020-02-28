import axios from 'axios';

export const loadDiagramType= 'loadDiagram';

const loadDiagram = (id)=>{
	return dispatch =>{
		axios.get("http://localhost:3001/diagrams/"+id)
		.then(response=>{
			dispatch({
				type: loadDiagramType,
				diagram: response.data
			});
		});
	};
};

export default loadDiagram;