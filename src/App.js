import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    names: []
  };
  onFormSubmit = (e) => {
    const name = this.refs.name.value;
    const names = [...this.state.names, name];
    this.setState({ names: names });
    this.refs.name.value = '';
    e.preventDefault();
  }
  render() {

    return (
      <div className="App">
        <h1>Sign Up Sheet</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name...'
            ref='name'
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
