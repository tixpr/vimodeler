import React from 'react';
import MenuButton from './MenuButton';
import PanelButton from './PanelButton';
import PanelCheckbox from './PanelCheckbox';

export default class Menu extends React.Component{
	constructor(props){
		super(props);
		window.__menu = this;
	}
	componentDidMount(){
	}
	toggleToolbox(){
		window.__toolbox.toggle();
	}
	toggleProperty(){
		window.__property.toggle();
	}
	toggleFile(){
		window.__files.toggle();
	}
	render(){
		return (
			<nav>
				<ul ref={(c)=>this.navigation=c}>
					<li>
						<MenuButton text="Archivo"/>
						<div className="menu_panel">
							<PanelButton cn="fa fa-folder fa-2x" text="Nuevo proyecto" on_click={()=>window.__vmodel.newProject()}/>
							<PanelButton cn="fa fa-file fa-2x" text="Nuevo mapa" on_click={()=>window.__vmodel.newMap()}/>
							<PanelButton cn="fa fa-file-o fa-2x" text="Nuevo diagrama" on_click={()=>window.__vmodel.newDiagram()}/>
						</div>
					</li>
					<li>
						<MenuButton text="Ver"/>
						<div className="menu_panel">
							<PanelCheckbox ref={(c)=>this.check_toolbox=c} pk="check-toolbox" text="Herramientas" on_change={()=>this.toggleToolbox()} checked="true"/>
							<PanelCheckbox ref={(c)=>this.check_property=c} pk="check-property" text="Propiedades" on_change={()=>this.toggleProperty()} checked="true"/>
							<PanelCheckbox ref={(c)=>this.check_files=c} pk="check-project" text="Proyectos" on_change={()=>this.toggleFile()} checked="true"/>
						</div>
					</li>
					<li>
						<MenuButton text="Proyecto"/>
					</li>
					<li>
						<MenuButton text="Herramientas"/>
					</li>
					<li>
						<MenuButton text="Ayuda"/>
					</li>
				</ul>
			</nav>
		);
	}
};