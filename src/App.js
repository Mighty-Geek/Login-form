import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    fields: {
      name: '',
      email: ''
    },
    people: [],
  };
  onInputChange = (e) => {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }
  onFormSubmit = (e) => {
    const people = [...this.state.people, this.state.fields];
    this.setState({ people, fields: { name: '', email: '' } });
    e.preventDefault();
  }
  render() {

    return (
      <div className="App">
        <h1>Sign Up Sheet</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Enter name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
          />
          <input
            placeholder='Enter email address'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />
          <input type='submit' />
        </form>
        <div>
          <h3>Names</h3>
          <ul>
            {this.state.people.map(({ name, email }, i) => <li key={i}>{name} ({email})</li>)}
          </ul>
        </div>
      </div>
    );

  }
}

export default App;
