import axios from 'axios';

export const newDiagramType = 'newDiagram';

const newDiagram = (diagram)=>{
	return dispatch =>{
		axios.post("http://localhost:3001/diagrams/",{diagram})
		.then(response=>{
			dispatch({
				type: newDiagramType,
				diagram: response.data
			});
		});
	};
};

export default newDiagram;