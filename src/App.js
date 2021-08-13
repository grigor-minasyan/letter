import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import blue from '@material-ui/core/colors/blue';
import Paper from '@material-ui/core/Paper';

import secret from './secret.js';
import AES from 'crypto-js/aes';
import enc_utf8 from 'crypto-js/enc-utf8';

import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
	typography: {
		fontFamily: ['"Patrick Hand"', 'cursive'].join(','),
		fontSize: 25,
	},
	palette: {
		primary: blue,
	},
});

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			padding: theme.spacing(2),
		},
	},
}));

function App() {
	const classes = useStyles();
	const [password, setPassword] = useState('');
	const [letter, setLetter] = useState('');
	const handleChange = (e) => {
		const value = e.target.value;
		const bytes = AES.decrypt(secret, value);

		let decrypted = '';

		try {
			const decrypted_test = bytes.toString(enc_utf8);
			decrypted = decrypted_test;
		} catch (error) {}
		setLetter(decrypted);
		setPassword(value);
	};
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth="md" className={classes.root}>
				<Paper elevation={15}>
					<Typography variant="body1" gutterBottom align="center">
						Please enter the password to see the letter. Wrong passwords won't show
						anything.
					</Typography>

					<FormControl fullWidth variant="outlined">
						<InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel>
						<OutlinedInput
							value={password}
							onChange={handleChange}
							labelWidth={95}
							type="password"
						/>
					</FormControl>

					<Typography variant="body1" gutterBottom align="left">
						{letter}
					</Typography>
				</Paper>
			</Container>
		</ThemeProvider>
	);
}

export default App;
