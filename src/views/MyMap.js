import React from 'react';
import {Toolbar} from 'primereact/toolbar';
import Box from '../components/Box';
import loadMap from '../redux/actions/mapActions/loadMap';
import updateMap from '../redux/actions/mapActions/updateMap';
import { connect } from 'react-redux';
import Modelayer from '../modelayer/Modelayer';

const boxs = [
	//Process
	{
		name: 'Process',
		element: <g
			transform="translate(0,-2074.7244)">
			<rect
				style={{
					fill: '#eceef7',
					fillOpacity: 1,
					stroke: '#434343',
					strokeWidth: 2,
					strokeMiterlimit: 4,
					strokeDasharray: 'none',
					strokeOpacity: 1
				}}
				width="28.526657"
				height="28.526657"
				x="0.73667163"
				y="2075.4612" />
		</g>
	},
	//Label
	{
		name: 'Label',
		element: <g
			transform="translate(0,-2074.7244)">
			<text
				style={{
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: '9px',
					fontFamily: 'sans-serif',
					fill: '#000000',
					fillOpacity: 1,
					stroke: 'none',
					strokeWidth: 1
				}}
				x="-0.87934661"
				y="2240.4998"
				transform="scale(1.0645098,0.93939952)">
				<tspan
					x="-0.87934661"
					y="2240.4998"
					style={{
						fontStyle: 'normal',
						fontVariant: 'normal',
						fontWeight: 'bold',
						fontStretch: 'normal',
						fontSize: '44px',
						lineHeight: 1.25,
						fontFamily: 'TlwgTypewriter',
						strokeWidth: 1
					}}>
					T
						</tspan>
			</text>
		</g>
	},
	//flow
	{
		name: 'Flow',
		element: <g
			transform="translate(0,-2074.7244)">
			<path
				d="M 0.53032973,2104.1941 28.837868,2075.8866"
				style={{
					fill: 'none',
					stroke: '#000000',
					strokeWidth: 1.5,
					strokeLinecap: 'butt',
					strokeLinejoin: 'miter',
					strokeMiterlimit: 4,
					strokeDasharray: 'none',
					strokeOpacity: 1
				}}
			/>
			<path
				transform="rotate(-0.29702875,27.598028,2076.9055)"
				d="m 29.99714,2074.7589 -0.86984,2.6488 -0.86984,2.6488 -1.858988,-2.0777 -1.858988,-2.0777 2.728828,-0.5711 z"
				style={{ strokeWidth: 2, strokeMiterlimit: 4, strokeDasharray: 'none' }}
			/>
		</g>
	}
];

class MyMap extends React.Component{
	componentDidMount(){
		this.props.loadMap(this.props.match.params.id);
	}
	componentDidUpdate(){
		console.info(this.props);
		this.modelayer = new Modelayer(this.cvs,"Map",this.props.map);
		window.__modelayer = this.modelayer;
	}
	saveMap(e){
		e.preventDefault();
		if(this.modelayer.id){
			console.info('actualizando');
			this.props.updateMap(this.modelayer.toJSON());
		}else{
			console.info('sin actualizar');
		}
	}
	render(){
		return (
			<div className="flex column">
				<Toolbar>
					<div className="p-toolbar-group-left">
						{boxs.map(el => <Box key={el.name} boxName={el.name} element={el.element} />)}
						<button onClick={(e)=>this.saveMap(e)}>
							Guardar
						</button>
					</div>
				</Toolbar>
				<div className="auto-flex cvs">
					<canvas ref={(c) => this.cvs = c} width="0" height="0">
					</canvas>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		map: state.map
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadMap(id) {
			dispatch(loadMap(id));
		},
		updateMap(map){
			dispatch(updateMap(map));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);