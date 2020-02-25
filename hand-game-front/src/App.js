import React from 'react';
import './App.css';
import Sender from './components/Sender'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Cookies from 'universal-cookie';
import uuid from 'uuid'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route exact path='/home' render={(props) => 
            <Sender {...props} isPlayer1={true}/>}/>
          <Route exact path='/join/:match_id/p2' render={(props) => 
            <Sender {...props} isPlayer1={false}/>}/>
        </header>
      </div>
    </Router>
  );
}

export default App;

//Cookies Management
const cookies = new Cookies();
if (typeof cookies.get('player_id') === 'undefined') {
  cookies.set('player_id', uuid.v4(), { path: '/' });
}