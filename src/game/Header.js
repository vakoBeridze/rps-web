import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Typography from '@material-ui/core/Typography/index';
import Button from '@material-ui/core/Button/index';
import Checkbox from "@material-ui/core/Checkbox/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import ButtonGroup from "@material-ui/core/ButtonGroup";


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	selected: {
		backgroundColor: 'coral',
	},
	rightItem: {
		marginLeft: 5
	},
});

function Header({...props}) {
	const {classes, debug, handleDebugChange, startNewGame, difficulty} = props;

	return (
		<div className={classes.root}>
			<AppBar position="static" color={"default"}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>Rock Paper Scissors </Typography>

					<Typography variant="body1" className={classes.rightItem}>New Game:</Typography>
					<ButtonGroup aria-label="full width outlined button group" className={classes.rightItem}>
						<Button onClick={() => startNewGame('easy')}
								className={difficulty === 'easy' ? classes.selected : ''}>
							Easy
						</Button>
						<Button onClick={() => startNewGame('medium')}
								className={difficulty === 'medium' ? classes.selected : ''}>Medium</Button>
						<Button onClick={() => startNewGame('hard')}
								className={difficulty === 'hard' ? classes.selected : ''}>Hard</Button>
					</ButtonGroup>
					<FormControlLabel
						className={classes.rightItem}
						control={
							<Checkbox checked={debug} color={"primary"} onChange={handleDebugChange}/>
						}
						label="Bot Thoughts"
					/>
				</Toolbar>
			</AppBar>
		</div>
	);
}


export default withStyles(styles)(Header);
