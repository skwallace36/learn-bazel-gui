import React from 'react';
import styled from 'styled-components';

const BuilderButton = styled.button`
	background-color: #43a047; /* Green */
	border: none;
	color: white;
	padding: 8px 16px;
	text-decoration: none;
	border-radius: 4px;
	&:hover {
		background-color: #2d6c30;
		text-decoration: none;
		
	}
`;

const FlexDiv = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

class CommandBuilder extends React.Component {
	
	commands = ["build", "run", "test", "query", "aquery", "cquery"];
	
  render() {
				
		const commandsGrid = this.commands.map((command) =>
	   		<BuilderButton key={command} >{command}</BuilderButton>
		);
		
		return (
			<> 
	  		<FlexDiv>
					{commandsGrid}
	  		</FlexDiv>	
			</>
		);
  }
}
export default CommandBuilder;

