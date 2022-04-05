import React from 'react';
import styled from 'styled-components';

const RunQueryButton = styled.button`
  margin-top:8px;
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

class CommandExecuter extends React.Component {

  constructor(props) {
    super(props);
    this.sayHello = this.sayHello.bind(this);
  }
     
  sayHello() {
    window.api.send("toMain", "suck it");
  }
  render() {
    return (
      <>
        <RunQueryButton onClick={this.sayHello}>
          execute
        </RunQueryButton>
      </>
    );
  }
}
export default CommandExecuter;