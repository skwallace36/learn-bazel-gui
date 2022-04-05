import React from 'react';
import ReactDOM from "react-dom";
import Select from 'react-select';

// import styled from 'styled-components';

class TargetsDisplay extends React.Component {
		
		
	constructor(props) {
		super(props);
		this.state = {value: 'build'};
	
		this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	// 
	// handleSubmit(event) {
	// 	alert('Your favorite flavor is: ' + this.state.value);
	// 	event.preventDefault();
	// }
	
	

	
	render() {
		
		const options = [
			{
				label: "Label 1",
				value: "key1"
			},
			{
				label: "Label 2",
				value: "key2"
			},
			{
				label: "Label 2",
				value: "key3"
			},
			{
				label: "Label 2",
				value: "key8"
			},
			{
				label: "Label 3",
				value: "key4"
			},
			{
				label: "Label 4",
				value: "key5"
			},
			{
				label: "Label 4",
				value: "key6"
			},
			{
				label: "Label 5",
				value: "key7"
			},
			{
				label: "Label 20",
				value: "key20"
			}
		];
		
		const targets = [
			{ label: "//:target" }
		];
		const filterOption = (option, input) => {
		// const cmd = command;
		// looking if other options with same label are matching inputValue
		// const otherKey = options.filter(
		// 	opt => opt.label === label && opt.value.includes(inputValue)
		// );
	
		return true;
	};
		
		// filterOption={filterOption}
		
		return (
			<> 
				<Select filterOption={filterOption} options={targets} />
			</>
		);
	}
	
	
}
export default TargetsDisplay;
