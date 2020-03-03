import React from 'react';
import Box from '../components/Box';
import { Toolbar } from 'primereact/toolbar';
import loadDiagram from '../redux/actions/diagramActions/loadDiagram';
import { connect } from 'react-redux';
import Modelayer from '../modelayer/Modelayer';

const boxs = [
	//Endevent
	{
		name: 'EndEvent',
		element: <g
			transform="translate(0,-2074.7244)"
		>
			<ellipse
				style={{
					fill: '#fcc9c8',
					fillOpacity: 1,
					stroke: '#840e1b',
					strokeWidth: 2,
					strokeMiterlimit: 4,
					strokeOpacity: 1,
					strokeDasharray: 'none'
				}}
				id="path5393"
				d="m 42.805215,18.405769 a 14.836616,13.952732 0 1 1 -29.673231,0 14.836616,13.952732 0 1 1 29.673231,0 z"
				cx="15.033858"
				cy="2089.7585"
				rx="14.098271"
				ry="14.026497"
			/>
		</g>
	},
	//Sequence
	{
		name: 'Sequence',
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
	},
	//Gateway
	{
		name: 'Gateway',
		element: <g
			transform="translate(0,-2074.7244)">
			<rect
				style={{
					fill: '#fffeb9',
					fillOpacity: 1,
					stroke: '#adc61c',
					strokeWidth: 2,
					strokeMiterlimit: 4,
					strokeDasharray: 'none',
					strokeOpacity: 1
				}}
				width="19.400581"
				height="19.400471"
				x="1462.817"
				y="1473.5447"
				transform="matrix(0.7148012,0.69932771,-0.69951531,0.71461761,0,0)" />
		</g>
	},
	//IntermediateEvent
	{
		name: 'IntermediateEvent',
		element: <g
			transform="translate(0,-2074.7244)">
			<circle
				style={{
					fill: '#fefcf4',
					fillOpacity: 1,
					stroke: '#928d43',
					strokewidth: 2,
					strokeMiterlimit: 4,
					strokeDasharray: 'none',
					strokeOpacity: 1
				}}
				cx="15"
				cy="2089.7244"
				r="13.995194" />
		</g>
	},
	//StratEvent
	{
		name: 'StartEvent',
		element: <g
			transform="translate(0,-2074.7244)">
			<circle
				style={{
					fill: '#eeffaf',
					fillOpacity: 1,
					stroke: '#799a45',
					strokeWidth: 2,
					strokeMiterlimit: 4,
					strokeDasharray: 'none',
					strokeOpacity: 1
				}}
				cx="15"
				cy="2089.7244"
				r="13.995194" />
		</g>
	},
	//Task
	{
		name: 'Task',
		element: <g
			transform="translate(0,-2074.7244)">
			<rect
				style={{
					fill: '#f7f7ff',
					fillOpacity: 1,
					stroke: '#1c75bc',
					strokeWidth: 2,
					strokeMiterlimit: 4,
					strokeDasharray: 'none',
					strokeOpacity: 1
				}}
				width="28.521238"
				height="28.521238"
				x="0.73938096"
				y="2075.4639" />
		</g>
	}
];

class Diagram extends React.Component {
	constructor(props){
		super(props);
		this.modelayer=null;
	}
	componentDidMount() {
		this.props.loadDiagram(this.props.match.params.id);
		this.modelayer = new Modelayer(this.cvs, "Diagram");
	}
	render() {
		return (
			<div className="flex column">
				<Toolbar>
					<div className="p-toolbar-group-left">
						{boxs.map(el => <Box key={el.name} boxName={el.name} element={el.element} />)}
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
		diagram: state.diagram
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadDiagram(id) {
			dispatch(loadDiagram(id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);