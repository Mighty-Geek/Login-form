import './App.css';
import validator from 'validator';
import { Component } from 'react';
import Field from './components/Field';
import CourseSelect from './components/CourseSelect';

class App extends Component {
  state = {
    fields: {
      name: '',
      email: '',
      course: '',
      department: '',
    },
    fieldErrors: {},
    people: [],
  };
  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  }
  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    // get array of all present errors
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (!person.course) return true;
    if (!person.department) return true;
    if (errMessages.length) return true;

    return false;
  }
  onFormSubmit = (e) => {
    const people = this.state.people;
    const person = this.state.fields;

    e.preventDefault();

    // prevent change for invalid input
    if (this.validate()) return;

    // add person to list people for valid input
    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: '',
      }
    })
  }
  render() {

    return (
      <div className="App">
        <h1>Sign Up Sheet</h1>
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Enter Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Name Required')}
          />
          <br />
          <Field
            placeholder='Enter Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (validator.isEmail(val) ? false : 'Invalid Email')}
          />
          <br />
          <CourseSelect
            department={this.state.fields.department}
            course={this.state.fields.course}
            onChange={this.onInputChange}
          />
          <br />
          <input type='submit' disabled={this.validate()} />
        </form>
        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({ name, email, department, course }, i) => <li key={i}>{[name, email, department, course].join(' 🌟 ')}</li>)}
          </ul>
        </div>
      </div>
    );

  }
}

export default App;
