import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function GameHistory({...props}) {
	const {history} = props;
	return (
		<div>
			<Paper style={{padding: 10}}>
				{history.join(" -> ")}
			</Paper>
		</div>

	);
}

