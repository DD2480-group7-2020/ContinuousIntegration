import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AllRepos from './routes/AllRepos';
import SingleRepo from './routes/SingleRepo';
import Build from './routes/Build';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/repo/:repo_id/:build_id' component={Build} />
          <Route path="/repo/:id" component={SingleRepo}/>
          <Route path="/repo" component={AllRepos}/>
          <Route path='/' component={AllRepos} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
