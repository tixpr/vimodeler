import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function OpenModelDialog(props) {
	const { onClose, models, open, ...other } = props;
	const [value, setValue] = React.useState(0);

	const handleCancel = () => {
		onClose();
	};

	const handleOk = () => {
		onClose(value);
	};

	const handleChange = event => {
		setValue(event.target.value);
	};
	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth="xs"
			aria-labelledby="confirmation-dialog-title"
			open={open}
			{...other}
		>
			<DialogTitle id="confirmation-dialog-title">Modelos</DialogTitle>
			<DialogContent dividers>
				<RadioGroup
					aria-label="model"
					name="model"
					value={value.toString()}
					onChange={handleChange}
				>
					{models.map(model => (
						<FormControlLabel value={model.id.toString()} key={model.id} control={<Radio />} label={model.name} />
					))}
				</RadioGroup>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleCancel} color="primary">
					Cancel
			</Button>
				<Button onClick={handleOk} color="primary">
					Ok
			</Button>
			</DialogActions>
		</Dialog>
	);
}