import React from 'react';


class CommandText extends React.Component {
  render() {
    return (
      <>
        <label>{this.props.command}</label>
      </>
    );
  }
}
export default CommandText;