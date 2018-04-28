import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
//import { ConnectedRouter } from "react-router-redux";
import store from "./configureStore";
import { history } from "./history";
import TodoPage from "./pages/todo/todoContainer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={TodoPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
