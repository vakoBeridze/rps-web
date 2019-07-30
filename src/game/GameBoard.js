import React from "react";
import {withStyles} from "@material-ui/core/styles/index";
import Header from "./Header";
import API from "../utils/API";
import CircularProgress from "@material-ui/core/CircularProgress";
import GameRPS from "./GameRPS";


const styles = theme => ({
	root: {
		flexGrow: 1,
		height: "100vh"
	}
});

class GameBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			debug: false,
			difficulty: 'hard'
		};
	}

	componentDidMount() {
		this.startNewGame(this.state.difficulty).then(() => {
			console.log(`Game started! difficulty ${this.state.difficulty}`)
		})
	}

	startNewGame = async (difficulty) => {
		this.setState({difficulty: difficulty, isLoading: true});
		let adaptChangesPercentage;
		if (difficulty === 'hard')
			adaptChangesPercentage = .95;
		if (difficulty === 'medium')
			adaptChangesPercentage = .6;
		if (difficulty === 'easy')
			adaptChangesPercentage = .3;

		await API.post("/new-game", {}, {params: {adaptChangesPercentage}});
		this.setState({isLoading: false})
	};

	handleDebugChange = () => {
		this.setState({debug: !this.state.debug})
	};

	render() {
		const {classes} = this.props;
		const {isLoading, debug, difficulty} = this.state;

		return (
			<div className={classes.root}>
				<Header debug={debug}
						difficulty={difficulty}
						handleDebugChange={this.handleDebugChange}
						startNewGame={this.startNewGame}
				/>
				{isLoading ?
					<CircularProgress className={classes.progress} color="secondary"/> :
					<GameRPS debug={debug}/>
				}
			</div>
		);
	}
}

export default withStyles(styles)(GameBoard);
