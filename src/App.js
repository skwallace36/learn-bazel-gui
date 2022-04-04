import logo from './logo.svg';
import CommandText from './CommandText';
import CommandBuilder from './CommandBuilder';
import Button from '@mui/material/Button';


function App() {
  
  function sayHello() {
    alert('clicked');
    window.api.send("toMain", "some data");
  }
  
  return (<>
    <CommandText command="bazel" />
    <CommandBuilder />
    <Button onClick={sayHello}>
      button
    </Button>
  </>);
}
 

export default App;
