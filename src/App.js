import './App.css';
import validator from 'validator';
import { Component } from 'react';

class App extends Component {
  state = {
    fields: {
      name: '',
      email: ''
    },
    fieldErrors: {},
    people: [],
  };
  onInputChange = (e) => {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }
  validate = (person) => {
    const errors = {};
    if (!person.name) errors.name = 'Name Required';
    if (!person.email) errors.email = 'Email Required';
    if (person.email && !validator.isEmail(person.email)) errors.email = 'Invalid Email';
    return errors;
  }
  onFormSubmit = (e) => {
    const people = [...this.state.people];
    const person = this.state.fields;
    const fieldErrors = this.validate(person);
    this.setState({ fieldErrors });
    e.preventDefault();

    if (Object.keys(fieldErrors).length) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: ''
      }
    })
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
          <span style={{ color: 'red' }}>{this.state.fieldErrors.name}</span>
          <br />
          <input
            placeholder='Enter email address'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
          />
          <span style={{ color: 'red' }}>{this.state.fieldErrors.email}</span>
          <input type='submit' />
        </form>
        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({ name, email }, i) => <li key={i}>{name} ({email})</li>)}
          </ul>
        </div>
      </div>
    );

  }
}

export default App;
