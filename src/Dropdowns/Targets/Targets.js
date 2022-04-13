import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Select, { components} from 'react-select';
import styled from 'styled-components';

class Targets extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			selected: { label: '', value: '' },
		}
		this.handleTargetSelection = this.handleTargetSelection.bind(this)
	}
	
	handleTargetSelection(e, a) {
		switch (a.action) {
			case 'select-option':
				this.setState({ selected: { value: e.value, label: e.label } })
				break
			case 'pop-value':
			case 'clear':
				this.setState({ selected: '' })
				break
			default:
				console.log(`unhandled action of type: ${a.action}`)
		}
	}
	

	render() {
		return (
			<Select name="input" value={this.state.selected} onChange={this.handleTargetSelection} options={this.props.targets} isClearable={true} /> 
		)
	}
}

export default Targets
