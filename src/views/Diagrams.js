import React from 'react';
import loadDiagrams from '../redux/actions/diagramsActions/loadDiagrams';
import {
	Link
} from "react-router-dom";
import {Card} from 'primereact/card';
import { connect } from 'react-redux';

class Diagrams extends React.Component{
	componentDidMount(){
		this.props.loadDiagrams();
	}
	render(){
		return (
			<div className="flex row justify-center align-center wrap">
				{this.props.diagrams.map(diagram=>{
					let to="/diagrams/"+diagram.id;
					return (
						<Link key={diagram.id} to={to}>
							<Card  title={diagram.name} style={{width: '360px',textAlign:'center',margin: '10px'}}>
							</Card>
						</Link>
					);
				})}
			</div>
		);
	}
}


const mapStateToProps = state => {
	return {
		diagrams: state.diagrams
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadDiagrams() {
			dispatch(loadDiagrams());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Diagrams);