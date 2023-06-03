import '../App.css';
import PropTypes from 'prop-types'
import validator from 'validator';
import { Component } from 'react';
import Field from './Field';
import CourseSelect from './CourseSelect';

class Form extends Component {
    static propTypes = {
        people: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
        saveStatus: PropTypes.string.isRequired,
        fields: PropTypes.object,
        onSubmit: PropTypes.func.isRequired,
    }
    state = {
        fields: this.props.fields || {
            name: '',
            email: '',
            course: '',
            department: '',
        },
        fieldErrors: {},
    };
    componentWillReceiveProps(update) {
        console.log('this.props.fields', this.props.fields, update);
        this.setState({ fields: update.fields });
    }
    onInputChange = ({ name, value, error }) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({ fields, fieldErrors, _saveStatus: 'READY' });
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
        const person = this.state.fields;
        e.preventDefault();

        // prevent change for invalid input
        if (this.validate()) return;

        this.props.onSubmit([...this.props.people, person]);
    }
    render() {
        if (this.props.isLoading) {
            return <img alt='loading' src='../../loading.gif' />
        }
        const dirty = Object.keys(this.state.fields).length;
        let status = this.props.saveStatus;
        if (status === 'SUCCESS' && dirty) status = 'READY';

        return (
            <div className="Form">
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
                    {{
                        SAVING: <input value='Saving...' type='submit' disabled />,
                        SUCCESS: <input value='Saved!' type='submit' disabled />,
                        ERROR: <input value='Save Failed - Retry?' type='submit' disabled={this.validate()} />,
                        READY: <input value='Submit' type='submit' disabled={this.validate()} />,
                    }[status]}
                </form>
                <div>
                    <h3>People</h3>
                    <ul>
                        {this.props.people.map(({ name, email, department, course }, i) => <li key={i}>{[name, email, department, course].join(' 🌟 ')}</li>)}
                    </ul>
                </div>
            </div>
        );

    }
}

export default Form;
