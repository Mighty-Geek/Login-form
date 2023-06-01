import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    names: [],
    name: ''
  };
  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  onFormSubmit = (e) => {
    const names = [...this.state.names, this.state.name];
    this.setState({ names: names, name: '' });
    e.preventDefault();
  }
  render() {

    return (
      <div className="App">
        <h1>Sign Up Sheet</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name...'
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input type='submit' />
        </form>
        <div>
          <h3>Names</h3>
          <ul>
            {this.state.names.map((name, i) => <li key={i}>{name}</li>)}
          </ul>
        </div>
      </div>
    );

  }
}

export default App;
