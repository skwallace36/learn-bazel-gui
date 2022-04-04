import React from 'react';
import Button from '@mui/material/Button';

class CommandExecuter extends React.Component {

  constructor(props) {
    super(props);
    this.sayHello = this.sayHello.bind(this);
  }
     
  sayHello() {
    window.api.send("toMain", this.props.command);
  }
  render() {
    return (
      <>
       <Button onClick={this.sayHello}>
         button
       </Button>
      </>
    );
  }
}
export default CommandExecuter;