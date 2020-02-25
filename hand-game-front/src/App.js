import React from 'react';
import './App.css';
import Sender from './components/Sender'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

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