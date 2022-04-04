import CommandText from './CommandText';
import CommandBuilder from './CommandBuilder';
import CommandExecuter from './CommandExecuter';
import React from 'react';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      command: "bazel build"
    };
  }
     
  handleCommandStateChange = (command) =>{
      this.setState({command: command})
  }
  
  render() {
    return (
      <> 
        <CommandText command={this.state.command} commandTextChanged={this.handleCommandStateChange} />
        <CommandBuilder />
        <CommandExecuter command={this.state.command} />
      </>
    );
  }
}

export default App;

