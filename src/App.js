import React, { useState } from 'react';
//ui material-ui
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TabPanel from './TabPanel';
//mis implementaciones
import Model from './components/Model';
import DiagramBoxs from './DiagramBoxs';
import MapBoxs from './MapBoxs';
import BoxItem from './components/Box';
import OpenModelDialog from './OpenModelDialog';
//iconos
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
//REDUX
import { connect } from 'react-redux';
import loadMaps from './redux/actions/mapsActions/loadMaps';
import loadDiagrams from './redux/actions/diagramsActions/loadDiagrams';
import loadMap from './redux/actions/mapActions/loadMap';
import loadDiagram from './redux/actions/diagramActions/loadDiagram';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	tabPanel: {
		flexGrow: 1,
		margin: '0px',
		padding: '0px',
		border: 'none',
		overflow: 'auto'
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		flexGrow: 1,
		height: '100vh',
		overflow: 'hidden',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		padding: '0px',
		margin: '0px',
		overflow: 'hidden',
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}));
function a11yProps(index) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}
function App({maps=[],diagrams=[],loadMaps,loadDiagrams,loadMap,loadDiagram}) {
	const classes = useStyles();
	const [drawer, setDrawer] = useState(true);
	const [tab, setTab] = useState(-1);
	const [model_dialog, setModel_dialog] = useState(false);
	const [mode, setMode] = useState('');
	const [model_name, setModel_name] = useState("");
	const [elementBoxs, setElementBoxs] = useState([]);
	const [open_model, setOpen_model] = useState(false);
	const [models, setModels] = useState([]);
	const drawerOpen = () => {
		setDrawer(true);
	};
	const drawerClose = () => {
		setDrawer(false);
	};
	const changeTab = (event, newVal) => {
		setTab(newVal);
		switch (models[newVal].props.mode) {
			case "Map": setElementBoxs(MapBoxs); break;
			case "Diagram": setElementBoxs(DiagramBoxs); break;
			default: break;
		}
	};
	const closeModelDialog = () => {
		setModel_dialog(false);
		setMode('');
	};
	const openMapDialog = () => {
		setMode('Map');
		setModel_dialog(true);
	};
	const openDiagramDialog = () => {
		setMode('Diagram');
		setModel_dialog(true);
	};
	const createModel = () => {
		/*
		let m = <Model mode={mode} model={{ name: model_name }} />;
		models.push(m);
		setModels(models);
		*/
		setModel_name('');
		changeTab(null, models.length - 1);
		closeModelDialog();
	};
	const changeModelName = (e) => {
		setModel_name(e.target.value);
	}
	const getMaps = ()=>{
		loadMaps();
		setMode("Map");
		setOpen_model(true);
	};
	const getDiagrams = ()=>{
		loadDiagrams();
		setMode("Diagram");
		setOpen_model(true);
	};
	const closeOpenModelDialog = (id) =>{
		if(id){
			id=parseInt(id);
			let ms = (mode==="Map")?(maps):(diagrams);
			let temp = ms.find(mo=>mo.id===id);
			let m = <Model mode={mode} model={temp} />;
			models.push(m);
			setModels(models);
		}
		changeTab(null, models.length - 1);
		setOpen_model(false);
		setMode('');
	};
	return (
		<div className={classes.root}>
			<AppBar position="absolute" className={clsx(classes.appBar, drawer && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={drawerOpen}
						className={clsx(classes.menuButton, drawer && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						ViModeler
          			</Typography>
					<IconButton color="inherit">
						<Badge badgeContent={4} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !drawer && classes.drawerPaperClose),
				}}
				open={drawer}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={drawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<div>
						<ListSubheader inset>Mapa</ListSubheader>
						<ListItem button onClick={getMaps}>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText primary="Abrir Mapa" />
						</ListItem>
						<ListItem button onClick={openMapDialog}>
							<ListItemIcon>
								<AddCircleIcon />
							</ListItemIcon>
							<ListItemText primary="Nuevo Mapa" />
						</ListItem>
					</div>
				</List>
				<Divider />
				<List>
					<div>
						<ListSubheader inset>Diagrama</ListSubheader>
						<ListItem button onClick={getDiagrams}>
							<ListItemIcon>
								<FolderOpenIcon />
							</ListItemIcon>
							<ListItemText primary="Abrir Diagrama" />
						</ListItem>
						<ListItem button onClick={openDiagramDialog}>
							<ListItemIcon>
								<AddCircleOutlineIcon />
							</ListItemIcon>
							<ListItemText primary="Nuevo Diagrama" />
						</ListItem>
					</div>
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="xl" className={classes.container}>
					<Grid container direction="row" alignItems="center" justify="center">
						{elementBoxs.map(el => <BoxItem key={el.name} boxName={el.name} element={el.element} />)}
					</Grid>
					<Container maxWidth="xl" className={classes.container}>
						{models.map((val, i) => {
							let k = "tp-" + i;
							return <TabPanel key={k} className={classes.tabPanel} value={tab} index={i} >{val}</TabPanel>;
						})}
					</Container>
					<Tabs
						value={tab}
						onChange={changeTab}
						aria-label="simple tabs example"
						variant="scrollable"
						scrollButtons="auto"
						indicatorColor="primary"
					>
						{models.map((m, i) => {
							let k = "tab-" + i;
							return <Tab key={k} label={m.props.model.name} {...a11yProps(i)} />;
						})}
					</Tabs>
				</Container>
			</main>
			<Dialog
				fullWidth={true}
				maxWidth="sm"
				TransitionComponent={Transition}
				open={model_dialog}
				onClose={closeModelDialog}
				aria-labelledby="form-dialog-title"
				>
				<DialogTitle id="form-dialog-title">Nuevo Modelo</DialogTitle>
				<DialogContent>
					<TextField
						value={model_name}
						onChange={changeModelName}
						autoFocus
						margin="dense"
						id="model_name"
						label="Nombre del Modelo"
						type="text"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModelDialog}>
						Cancelar
         			</Button>
					<Button onClick={createModel} color="primary">
						Crear
        			</Button>
				</DialogActions>
			</Dialog>
			<OpenModelDialog
				fullWidth={true}
				TransitionComponent={Transition}
				maxWidth="sm"
				onClose={closeOpenModelDialog}
				models={(mode==="Map")?(maps):(diagrams)}
				value={null}
				open={open_model}
				/>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		maps: state.maps,
		diagrams: state.diagrams,
		models: state.models
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadMaps() {
			dispatch(loadMaps());
		},
		loadDiagrams() {
			dispatch(loadDiagrams());
		},
		loadMap(id){
			dispatch(loadMap(id));
		},
		loadDiagram(id){
			dispatch(loadDiagram(id));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);