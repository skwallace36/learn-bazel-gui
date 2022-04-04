import React from 'react';


class CommandText extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  
  handleStateChange(event) {
    this.props.commandTextChanged(event.target.value);
  }
  
  render() {
    return (
      <>
        <textarea value={this.props.command} onChange={this.handleStateChange}/>
      </>
    );
  }
}
export default CommandText;