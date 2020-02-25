import React from 'react';
import './GameModes.css';
import Cookies from 'universal-cookie';

class GameModes extends React.Component {
    handleGameMode = (e,mode) => {
        e.preventDefault();
        let cookies = new Cookies();
        let player_id = cookies.get('p1_player_id');
        this.props.socket.ws.send(JSON.stringify({
            'type': 'create_match',
            'game_type': mode,
            'player_id': player_id
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