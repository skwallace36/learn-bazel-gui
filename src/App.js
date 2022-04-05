import CommandText from './CommandText';
import CommandBuilder from './CommandBuilder';
import CommandExecuter from './CommandExecuter';
import TargetsDisplay from './TargetsDisplay';

import React from 'react';

const { ipcRenderer } = window.api;

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      command: "bazel"
    };
    this.doTheThing = this.doTheThing.bind(this)
    
    window.api.receive("fromMain", (data) => {
       console.log(`Received ${data} from main process`);
    });
  }
     
  handleCommandStateChange = (command) =>{
      this.setState({command: command})
  }
  
  doTheThing() {
    const data = "data2222";
    console.log(`sending ${data} to main`);
    window.api.send("toMain", `${data}`);
  }
  

  render() {
    return (
      <> 
        <CommandText command={this.state.command} commandTextChanged={this.handleCommandStateChange} />
        <CommandBuilder />
        <CommandExecuter command={this.state.command} />
        <br />
        <TargetsDisplay />
        <button onClick={this.doTheThing}>test</button>
      </>
    );
  }
}

export default App;

