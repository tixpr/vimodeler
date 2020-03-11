import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<Paper
			elevation={0}
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{children}
		</Paper>
	);
};