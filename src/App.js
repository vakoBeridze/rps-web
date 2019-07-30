import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import GameBoard from "./game/GameBoard";

function App() {
	return (

		<React.Fragment>
			<CssBaseline/>
			<GameBoard/>
		</React.Fragment>
	);
}

export default App;
