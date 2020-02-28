import axios from 'axios';

export const loadDiagramsType = "loadDiagrams";

const loadDiagrams = ()=>{
	return dispatch =>{
		axios.get("http://localhost:3001/diagrams")
		.then(response=>{
			dispatch({
				type: loadDiagramsType,
				diagrams: response.data
			});
		});
	};
};

export default loadDiagrams;