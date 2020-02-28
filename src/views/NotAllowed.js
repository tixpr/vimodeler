import React from 'react';
import { useHistory} from 'react-router-dom';

export default function NotAllowed(){
	const h=useHistory();
	function toBack(){
		h.goBack();
	}
	return (
		<div className="flex column">
			<h1>
				Ruta no encontrada
			</h1>
			<button onClick={toBack}>
				Atras
			</button>
		</div>
	);
};