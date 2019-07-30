import React from "react";
import {withStyles} from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import API from "../utils/API";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import BotThoughts from "./BotThoughts";
import GameHistory from "./GameHistory";


const styles = theme => ({
	container: {
		padding: 20
	},
	paper: {
		padding: 20,
		textAlign: 'center',
	},
	item: {
		marginTop: 30
	},
	nothing: {},
	chosenItem: {
		backgroundColor: 'lightblue'
	},
	winner: {
		backgroundColor: 'greenyellow',
		borderRadius: '5px'
	},
	flexContainer: {
		display: 'flex',
		flexDirection: 'row',
		padding: 0
	}
});

const moveNames = {R: 'Rock', P: 'Paper', S: 'Scissors'};
const beat = {R: 'P', P: 'S', S: 'R'};

class GameRPS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			debug: false,
			currentWinner: '',
			botScore: 0,
			botChoice: {},
			botChoiceHidden: true,
			botThoughts: null,
			humanScore: 0,
			humanChoice: '',
			round: 1,
			gameHistory: null
		};
	}

	componentDidMount() {
		this.fetchNextBotPrediction().then((prediction) => {
			this.setState({botChoice: prediction});
		})
	}

	fetchNextBotPrediction = async () => {
		let result = await API.get("/predict");
		return result.data;
	};

	fetchBotThoughts = async () => {
		let result = await API.get("/bot-thoughts");
		return result.data;
	};

	saveHumanChoice = async () => {
		const {botChoice, humanChoice} = this.state;
		await API.post("/save", {}, {
			params: {
				botChoice: botChoice.moveToBeatHuman,
				humanChoice
			}
		});
	};

	handleClick = value => {
		if (!this.state.humanChoice) {
			let winner = this.checkWinner(value, this.state.botChoice.moveToBeatHuman);
			let botScore = this.state.botScore;
			let humanScore = this.state.humanScore;
			if (winner === 'Bot') {
				botScore++;
			}
			if (winner === 'Human') {
				humanScore++;
			}
			this.setState({
				humanChoice: value,
				botChoiceHidden: false,
				currentWinner: winner,
				botScore: botScore,
				humanScore: humanScore
			})
		}
	};

	checkWinner = (humanChoice, botChoice) => {
		if (humanChoice === botChoice)
			return 'Tie';
		if (beat[humanChoice] === botChoice)
			return 'Bot';
		return 'Human';
	};

	tryAgain = async () => {
		await this.saveHumanChoice();
		let nextPrediction = await this.fetchNextBotPrediction();
		let botThoughts = this.props.debug ? await this.fetchBotThoughts() : null;

		this.setState({
			humanChoice: '',
			botChoiceHidden: true,
			currentWinner: '',
			botChoice: nextPrediction,
			botThoughts: botThoughts ? botThoughts.thoughts : null,
			gameHistory: botThoughts ? botThoughts.history : null,
			round: ++this.state.round
		})
	};


	render() {
		const {classes, debug} = this.props;
		const {botThoughts, botChoiceHidden, botChoice, humanChoice, botScore, humanScore, currentWinner, round, gameHistory} = this.state;

		return (
			<Container fixed>
				<Grid container spacing={2} className={classes.container}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Typography variant={"h4"}>Round: {round}</Typography>
							<Grid container className={classes.item}>
								<Grid item xs={5}>
									<Typography variant={"h5"}
												className={currentWinner === 'Bot' ? classes.winner : ''}>
										Bot
									</Typography>
									<ButtonGroup className={classes.item}
												 aria-label="full width outlined button group">
										<Button variant={"outlined"}
												className={botChoiceHidden ? '' : classes.chosenItem}>
											{botChoiceHidden ? 'Bot Prediction Hidden' : moveNames[botChoice.moveToBeatHuman]}
										</Button>
									</ButtonGroup>
									{botChoiceHidden ? '' :
										<div style={{textAlign: "left"}}>
											<Typography className={classes.item} variant={"body2"}>
												Bot thought you would choose:
											</Typography>

											<List className={classes.flexContainer}>
												{
													botChoice.predictions.map((prediction, key) => (
															<ListItem key={key}>
																<ListItemText primary={moveNames[prediction.move]}
																			  secondary={(Number(prediction.probability) * 100).toFixed(2) + '%'}/>
															</ListItem>
														)
													)
												}
											</List>
										</div>
									}
								</Grid>
								<Grid item xs={2}>
									<Typography variant={"h6"}>VS</Typography>
									<Typography className={classes.item} variant={"h4"}>
										{botScore}:{humanScore}
									</Typography>
									<Typography className={classes.item} variant={"h4"}>
										{currentWinner === 'Tie' ? currentWinner : currentWinner.length === 0 ? '' : currentWinner + " Wins"}
									</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography variant={"h5"}
												className={currentWinner === 'Human' ? classes.winner : ''}>
										Human
									</Typography>
									<ButtonGroup className={classes.item} fullWidth
												 aria-label="full width outlined button group">
										<Button onClick={() => this.handleClick('R')}
												className={humanChoice === 'R' ? classes.chosenItem : ''}>
											Rock
										</Button>
										<Button onClick={() => this.handleClick('P')}
												className={humanChoice === 'P' ? classes.chosenItem : ''}>
											Paper
										</Button>
										<Button onClick={() => this.handleClick('S')}
												className={humanChoice === 'S' ? classes.chosenItem : ''}>
											Scissors
										</Button>
									</ButtonGroup>

									<Button color={"secondary"} variant={"outlined"} disabled={humanChoice.length === 0}
											style={{marginTop: 70, marginBottom: 30}}
											onClick={this.tryAgain}>Try Again
									</Button>

								</Grid>
							</Grid>
						</Paper>
					</Grid>
					{
						debug && gameHistory && gameHistory.length !== 0 ?
							<Grid item xs={12}>
								<GameHistory history={gameHistory}/>
							</Grid> :
							null
					}
					{
						debug && botThoughts ?
							<Grid
								item xs={12}>
								<BotThoughts thoughts={botThoughts}/>
							</Grid> :
							null
					}
				</Grid>
			</Container>
		);
	}
}

export default withStyles(styles)(GameRPS);
