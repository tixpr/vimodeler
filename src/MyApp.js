import React, { useState } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BoxItem from './components/Box';
import MapBoxs from './MapBoxs';
import DiagramBoxs from './DiagramBoxs';
import Model from './Model';
import TabPanel from './TabPanel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

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


export default function App() {
	const [models, setModels] = useState([]);
	const classes = useStyles();
	const [drawer, setDrawer] = useState(true);
	const [tab, setTab] = useState(-1);
	const [map_dialog,setMap_dialog] = useState(false);
	const [diagram_dialog,setDiagram_dialog] = useState(false);
	const [map_name,setMap_name] = useState("");
	const [diagram_name,setDiagram_name] = useState("");
	const [elementBoxs, setElementBoxs] = useState([]);
	const drawerOpen = () => {
		setDrawer(true);
	};
	const drawerClose = () => {
		setDrawer(false);
	};
	const changeTab = (event, newVal) => {
		setTab(newVal);
		switch(models[newVal].props.mode){
			case "Map":setElementBoxs(MapBoxs);break;
			case "Diagram":setElementBoxs(DiagramBoxs);break;
			default: break;
		}
	};
	const closeMapDialog = ()=>{
		setMap_dialog(false);
	};
	const openMapDialog = ()=>{
		setMap_dialog(true);
	};
	const closeDiagramDialog = ()=>{
		setDiagram_dialog(false);
	};
	const openDiagramDialog = ()=>{
		setDiagram_dialog(true);
	};
	const createMap = ()=>{
		let m = <Model mode="Map" model={{name:map_name}} />;
		models.push(m);
		setModels(models);
		setElementBoxs(MapBoxs);
		closeMapDialog();
		setMap_name("");
		setTab(models.length-1);
	}
	const changeMapName= (e)=>{
		setMap_name(e.target.value);
	}
	const createDiagram = ()=>{
		let m = <Model mode="Diagram" model={{name:diagram_name}} />;
		models.push(m);
		setModels(models);
		setElementBoxs(DiagramBoxs);
		closeDiagramDialog();
		setDiagram_name("");
		setTab(models.length-1);
	}
	const changeDiagramName= (e)=>{
		setDiagram_name(e.target.value);
	}
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
						<ListItem button >
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
						<ListItem button>
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
					{models.map((val,i)=>{
						let k = "tp-"+i;
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
						{models.map((m,i)=>{
							let k = "tab-"+i;
							return <Tab key={k} label={m.props.model.name} {...a11yProps(i)} />;
						})}
					</Tabs>
				</Container>
			</main>
			<Dialog open={map_dialog} onClose={closeMapDialog} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Nuevo Mapa</DialogTitle>
				<DialogContent>
					<TextField
						value={map_name}
						onChange={changeMapName}
						autoFocus
						margin="dense"
						id="model_name"
						label="Nombre del Mapa"
						type="text"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeMapDialog}>
						Cancelar
         			</Button>
					<Button onClick={createMap} color="primary">
						Crear
        			</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={diagram_dialog} onClose={closeDiagramDialog} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Nuevo Diagrama</DialogTitle>
				<DialogContent>
					<TextField
						value={diagram_name}
						onChange={changeDiagramName}
						autoFocus
						margin="dense"
						id="model_name"
						label="Nombre del Diagrama"
						type="text"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDiagramDialog}>
						Cancelar
         			</Button>
					<Button onClick={createDiagram} color="primary">
						Crear
        			</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};