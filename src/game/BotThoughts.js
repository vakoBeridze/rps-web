import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function BotThoughts({...props}) {
	const {thoughts} = props;
	let moves = thoughts ? Object.keys(thoughts) : [];
	return (
		<div>
			<Paper>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Last Move (Bot - Human)</TableCell>
							<TableCell align="right">Rock</TableCell>
							<TableCell align="right">Paper</TableCell>
							<TableCell align="right">Scissors</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{moves.map(move => (
							<TableRow key={move}>
								<TableCell component="th" scope="row">
									{move}
								</TableCell>
								<TableCell
									align="right">{(100 * Number(thoughts[move]['moves']['R'].probability)).toFixed(2) + '%'}
								</TableCell>
								<TableCell
									align="right">{(100 * Number(thoughts[move]['moves']['P'].probability)).toFixed(2) + '%'}
								</TableCell>
								<TableCell
									align="right">{(100 * Number(thoughts[move]['moves']['S'].probability)).toFixed(2) + '%'}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</div>

	);
}

export default BotThoughts;
