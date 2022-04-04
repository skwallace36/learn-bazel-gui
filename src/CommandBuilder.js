import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


class CommandBuilder extends React.Component {
	
	commands = ["build", "run", "test", "query", "aquery", "cquery"];
	
	constructor(props) {
		super(props);
	}
	
  render() {
		
		const commandsGrid = this.commands.map((command) =>
	 		<Grid key={command} item>
	   		<Paper>{command}</Paper>
	 		</Grid>
		);
		return (
			<> 
	  		<Grid container spacing={2}>
					{commandsGrid}
	  		</Grid>	
			</>
		);
  }
}
export default CommandBuilder;

