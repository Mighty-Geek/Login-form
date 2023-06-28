import React from 'react';
import thunk from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { reducer } from './redux-reducer';
import { fetchPeople, savePeople } from './redux-actions';
import Form from './components/Form';

const store = createStore(reducer, applyMiddleware(thunk));

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    fields: state.person,
    people: state.people,
    saveStatus: state.saveStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (people) => {
      dispatch(savePeople(people));
    },
  };
}

const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(Form);

class App extends React.Component {
  componentWillMount() {
    store.dispatch(fetchPeople());
  }
  render() {
    return (
      <Provider store={store}>
        <ReduxForm />
      </Provider>
    );
  }
};

export default App;
