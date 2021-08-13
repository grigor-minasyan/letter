import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import secret from './secret.js';
import AES from 'crypto-js/aes';
import enc_utf8 from 'crypto-js/enc-utf8';

import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
	typography: {
		fontFamily: ['"Patrick Hand"', 'cursive'].join(','),
		fontSize: 14,
	},
	palette: {
		primary: purple,
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
		let decrypted = '';
		try {
			const bytes = AES.decrypt(secret, value);
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
					<FormControl fullWidth variant="outlined">
						<TextField
							onChange={handleChange}
							value={password}
							label="Enter the password to see the letter"
							type="password"
							variant="outlined"
						/>
					</FormControl>

					<Typography
						variant="body1"
						gutterBottom
						align="left"
						style={{ whiteSpace: 'pre-wrap' }}
					>
						{letter}
					</Typography>
				</Paper>
			</Container>
		</ThemeProvider>
	);
}

export default App;
