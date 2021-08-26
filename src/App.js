import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Agents from './components/agents/Agents';
import { createBrowserHistory } from "history";
import Header from './components/header/Header';
import Home from './components/home/Home';
import { Provider } from 'react-redux';
import React from "react";
import store from '../src/redux/store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router history={createBrowserHistory()}>
          <Switch>
            <Route path="/">
              <Header></Header>
            <Switch>
                <Route path="/agents"><Agents/></Route>
                <Route path="/"><Home /></Route>
              </Switch>
            </Route>
          </Switch>
        </Router>
        </Provider>
    </div>
  );
}

export default App;
