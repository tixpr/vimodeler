
//UI
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
//==============================================

export default class VModel extends React.Component {
	constructor(props) {
		super(props);
		window.__vmodel = this;
		this.data_boxs = {
		};
		this.navs=[
			{
				label: 'Archivo',
				icon: 'pi pi-fw pi-file',
				items: [
					{
						label: 'Nuevo',
						icon: 'pi pi-fw pi-plus',
						items: [
							{
								label: 'Mapa',
								icon: 'pi pi-fw pi-file-o',
								command: () => {
									window.__vmodel.showAdd('addMap');
								}
							},
							{
								label: 'Diagrama',
								icon: 'pi pi-fw pi-file-o',
								command: () => {
									window.__vmodel.showAdd('addDiagram');
								}
							}
						]
					}
				]
			}
		];
		this.state = {
			is_modeling: false,
			model_mode: '',
			add_show: false,
			add_name:''
		};
	}
	componentDidMount() {
		/*
		if (this.cvs.getContext) {
			this.modelayer = new Modelayer(this.cvs);
		} else {
			console.error("canvas.getContext no soportado");
		}
		*/
	}
	showAdd(mode) {
		this.add_mode = mode;
		this.setState({ add_show: true });
	}
	hideAdd() {
		this.add_mode = '';
		this.setState({ add_show: false,add_name:'' });
	}
	yesAdd() {
		this.cvs.setAttribute('width', window.screen.width);
		this.cvs.setAttribute('height', window.screen.height);
		this[this.add_mode](this.state.add_name);
		this.hideAdd();
	}
	addMap(name = '') {
		this.modelayer.addProcessMap(name);
		this.setState({
			model_mode: 'Map',
			is_modeling: true
		});
	}
	addDiagram(name = '') {
		this.modelayer.addProcessDiagram(name);
		this.setState({
			model_mode: 'Diagram',
			is_modeling: true
		});
	}
	render() {
		const footerAdd = (
			<div>
				<Button label="Aceptar" icon="pi pi-check" onClick={() => this.yesAdd()} />
				<Button label="Cancelar" icon="pi pi-times" onClick={() => this.hideAdd()} className="p-button-secondary" />
			</div>
		);
		let boxs = this.data_boxs[this.state.model_mode]||[];
		return (
			<div className="flex column">
				<Menubar model={this.navs}>
				</Menubar>
				<div className="auto-flex" style={{overflow:'hidden'}}>
					<div className="flex row">
						
					</div>
				</div>
				<Dialog header="Nuevo" footer={footerAdd} visible={this.state.add_show} style={{ width: '100%',maxWidth:'300px' }} modal={true} onHide={(e) => this.hideAdd(e)}>
					<InputText ref={(c) => this.input_add = c} placeholder="Nombre" style={{width:'100%'}} type="text" value={this.state.add_name} onChange={(e) => this.setState({add_name:e.target.value})} />
				</Dialog>
			</div>
		);
	}
};


/*
//centro del modelador
						<div className="flex column">
							{this.state.is_modeling ? (
								<Toolbar>
									<div className="p-toolbar-group-left">
										{boxs.map(el => <Box key={el.name} boxName={el.name} element={el.element} />)}
									</div>
								</Toolbar>
							) : (null)}
							<div className="auto-flex cvs" ref={(c) => this.cvs_content = c}>
								<canvas ref={(c) => this.cvs = c} width="0" height="0">
								</canvas>
							</div>
						</div>
*/
