import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber,
    error: red
  },
});

export default theme;