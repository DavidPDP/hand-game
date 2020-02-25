import React from 'react';
import './GameModes.css';

class GameModes extends React.Component {
    handleGameMode = (e,mode) => {
        e.preventDefault();
        this.props.socket_p1.ws.send(JSON.stringify({
            'type': 'create_match',
            'game_type': mode
        }))
    };
    render(){
        return(
            <div className="GameModePanel">
                <p>
                    Welcome, please choose a game mode!
                </p>
                <a href="/" onClick={e => this.handleGameMode(e,'Easy')} className="game-mode">Easy</a>
                <a href="/" onClick={e => this.handleGameMode(e,'Normal')} className="game-mode">Normal</a>
                <a href="/" onClick={e => this.handleGameMode(e,'Hard')} className="game-mode">Hard</a>
            </div>
        );
    }
}

export default GameModes;