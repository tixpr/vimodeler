import React from 'react';
import loadMaps from '../redux/actions/mapsActions/loadMaps';
import {
	Link
} from "react-router-dom";
import {Card} from 'primereact/card';
import { connect } from 'react-redux';

class Maps extends React.Component{
	componentDidMount(){
		this.props.loadMaps();
	}
	render(){
		return (
			<div className="flex row justify-center align-center wrap">
				{this.props.maps.map(map=>{
					let to="/maps/"+map.id;
					return (
						<Link key={map.id} to={to}>
							<Card  title={map.name} style={{width: '360px',textAlign:'center',margin: '10px'}}>
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
		maps: state.maps
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadMaps() {
			dispatch(loadMaps());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Maps);