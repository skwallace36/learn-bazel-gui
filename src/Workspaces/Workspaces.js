import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Select, { components} from 'react-select';
import styled from 'styled-components';
import Workspace from '../App.js'

const FlexDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

const SelectDiv = styled.div`
	display: flex;
	margin-left: 20px;
	margin-right: 20px;
	margin-top: 10px;
	margin-bottom: 10px;
	justify-content: center;
`

const InnerSelectDiv = styled.div`
	align-self: center;
	background: pink;
	width: 280px;
`

class Workspaces extends React.Component {
		
	constructor(props) {
		super(props)
		this.state = {
			selectedValue: this.props.workspace
		}
		this.selectionChanged = this.selectionChanged.bind(this)
	}
	
// 	getPackages() {
// 		if (typeof this.props.workspacePath === 'undefined' || this.props.workspacePath === '') {
// 			return
// 		}
// 		window.api.receive(`packages:get:${this.props.workspacePath}`, async (fromCache, data) => {
// 			const packages = data.packages.map((element) => ({value: element, label: element}));
// 			this.props.setPackages(packages)
// 		});
// 		window.api.send('toMain', `packages:get:${this.props.workspacePath}`)
// 	}
// 
// 	getTargets() {
// 		if (typeof this.props.workspacePath === 'undefined' || this.props.workspacePath === '') {
// 			return
// 		}
// 		window.api.receive(`targets:get:${this.props.workspacePath}`, async (fromCache, data) => {
// 			const targets = data.targets.map((element) => ({value: element, label: element}));
// 			this.props.setTargets(targets)
// 		});
// 		window.api.send('toMain', `targets:get:${this.props.workspacePath}`)
// 	}

	componentDidMount() {
		this.setState({selectedValue: this.props.workspace})
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		// console.log(this.props.workspaces.map(item => item.uuid))
		console.log(this.props.workspaces.map((item) => ({name: item.name, uuid: item.uuid})) )

		if(prevProps.workspace !== this.props.workspace) {
			this.setState({ selectedValue: this.props.workspace })
		}
	}
	
	selectionChanged(e, a) {
		if(a.action === 'clear') {
			this.setState({selectedValue: new Workspace('', '')})
		} else {
			this.setState({selectedValue: e})
			
		}
		this.props.selectionChanged(e, a)


	}

	render() {
		return (<>
			<FlexDiv>
				<SelectDiv>
				<InnerSelectDiv>
					<Select 
						isClearable={true}
						options={this.props.workspaces}
						value={this.state.selectedValue}
						getOptionLabel={(workspace) => workspace.name}
						getOptionValue={(workspace) => workspace.path}
						onChange={this.selectionChanged}
						disabled={true}
					/>
					</InnerSelectDiv>
				</SelectDiv>
			</FlexDiv>
		</>);
	}
	
	// render() {
	// 	return (
	// 		<Select
	// 		name="input"
	// 		value={selectedValue}
	// 		isClearable={true}
	// 		options={this.state.options.map((item) => ({name: item.path, label: item.name}))}
	// 		onChange={e => this.handleChange(e)}
	// 		/> 
	// 	)
	// }
}

export default Workspaces
