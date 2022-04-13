import Packages from './Dropdowns/Packages/Packages';
import Targets from './Dropdowns/Targets/Targets';
import Workspaces from './Workspaces/Workspaces';
import SingleTargetActions from './SingleTargetActions';
import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';


class Workspace {
  constructor(name = '', path = '') {
    this.name = name
    this.path = path
    this.uuid = uuidv4()
  }
}

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.emptyWorkspace = new Workspace()
    this.state = {
      workspace: this.emptyWorkspace,
      workspaces: [],
      targets: [],
      packages: []
    };
    this.workspacesSelectionChanged = this.workspacesSelectionChanged.bind(this)
    this.setWorkplacesState = this.setWorkplacesState.bind(this)
  }
  
  setWorkplacesState(name = '', path = '', workspaces = []) {
    if(name === '') {
      this.setState({workspace: this.emptyWorkspace})
    }
    
    var mapped = workspaces.map((item) => new Workspace(item.name, item.path))
    var currentNames = this.state.workspaces.map((item) => item.name)
    var filtered = mapped.filter((item) => {
      if (currentNames.includes(item.name) == false) {
        return true
      }
      return false
    })
    var nextWorkspaces = [...this.state.workspaces, ...filtered]
    var nextWorkspace = nextWorkspaces.find(element => element.name == name)
    this.setState({
      workspaces: nextWorkspaces,
      workspace: nextWorkspace
    })
  }
  
  componentDidMount() {
    window.api.receive('settings:get:last_workspace', async (fromCache, workspace) => {
      if(typeof workspace === 'undefined' || workspace.name === '') { 
        this.setWorkplacesState()
        return
      }
      this.setWorkplacesState(workspace.name, workspace.path, [{name: workspace.name, path: workspace.path}])
    })
    window.api.send('toMain', 'settings:get:last_workspace', {disableCache: true})
  	window.api.receive('workspaces:get', async (fromCache, data) => {
      console.log(this.state.workspace)
      this.setWorkplacesState(this.state.workspace.name, this.state.workspace.path, data.workspaces)
  	});
  	window.api.send('toMain', 'workspaces:get')
  }
  
  // setPackages(packages) { this.setState({ packages: packages }) }
  // 
  // setTargets(targets) { this.setState({ targets: targets }) }
  // 
  
  workspacesSelectionChanged(e, a) {
    switch (a.action) {
    	case 'select-option':
        this.setWorkplacesState(e.name, e.path)
        console.log(e)
        window.api.send('toMain', `settings:set:last_workspace`, {name: e.name, path: e.path})
    		break
    	case 'pop-value':
    	case 'clear':
        this.setWorkplacesState()
        window.api.send('toMain', `settings:set:last_workspace`, {name: '', path: ''})
    		break
    	default:
    		console.log(`unhandled action of type: ${a.action}`)
    }
  }
  
  render() {
    return (<>
      <Workspaces
        workspaces={this.state.workspaces}
        workspace={this.state.workspace}
        selectionChanged={this.workspacesSelectionChanged}
      />
    </>);
  }
}
// <Packages workspaceName={this.workspaceName} workspacePath={this.workspacePath} packages={this.state.packages}/>
// <Targets workspaceName={this.workspaceName} workspacePath={this.workspacePath} targets={this.state.targets}/>
// <SingleTargetActions />
export default App