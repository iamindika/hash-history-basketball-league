import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import TeamPage from './TeamPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/teams" component={Teams} />
          <Route path="/:teamId" component={TeamPage} />
          <Route render={({location}) => (
            <h2 className="text-center">
              404: {location.pathname} not found!
            </h2>
          )}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
