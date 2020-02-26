import React from 'react';
import GameModes from './GameModes'
import Match from './Match'
import logo from '../logo.svg';
import WebsocketController from './WebsocketController';
import Cookies from 'universal-cookie';
import uuid from 'uuid'

const match_info = {
    socket: new WebsocketController(1),
    game_mode_visible: true,
    opponent_url_visible: true,
    match_id: '',
    start_match: false,
    is_player1: '',
    winner: '',
    finish: false
}

const multimedia_data = {
    multimedia: '',
    socket: '',
    match_id: ''
}

class Sender extends React.Component {
    componentDidMount(){
        this.connection = match_info.socket.ws;
        match_info.is_player1 = this.props.isPlayer1;
        
        this.connection.onmessage = evt => { 
            var message = JSON.parse(evt.data);
            if(message.type === 'create_match'){
                match_info.game_mode_visible = false;
                match_info.match_id = message.match_id;
                multimedia_data.multimedia = message.multimedia;
                multimedia_data.socket = match_info.socket;
                multimedia_data.match_id = match_info.match_id;
                this.forceUpdate();
            }else if(message.type === 'join_match'){
                match_info.opponent_url_visible = false;
                multimedia_data.multimedia = message.multimedia;
                multimedia_data.socket = match_info.socket;
                multimedia_data.match_id = match_info.match_id;
                this.forceUpdate();
            }else if(message.type === 'match_finished'){
                match_info.winner = message.winner;
                match_info.finish = true;
                this.forceUpdate();
            }
        }
        this.connection.onopen = evt => {
            const cookies = new Cookies();
            if(!this.props.isPlayer1){
                let player_id = cookies.get('p2_player_id');
                if (typeof player_id === 'undefined') {
                    cookies.set('p2_player_id', uuid.v4(), { path: '/' });
                    player_id = cookies.get('p2_player_id');
                }
                console.log(match_info)
                match_info.socket.ws.send(JSON.stringify({
                    'type': 'join_match',
                    'match_id': this.props.match.params.match_id,
                    'player_id': player_id
                }))
                match_info.game_mode_visible = false;
                match_info.opponent_url_visible = false;
                match_info.match_id = this.props.match.params.match_id
            }else{
                if (typeof cookies.get('p1_player_id') === 'undefined') {
                    cookies.set('p1_player_id', uuid.v4(), { path: '/' });
                }
            }
        }
    };

    render() {
        if(match_info.game_mode_visible){
            return (
                <div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <GameModes {...match_info}/>
                </div>
            );
        }else {
            if(match_info.opponent_url_visible){
                return (
                    <div>
                        <p>Send the URL to your opponent to start</p>
                        <input type='text' defaultValue={'http://localhost:3000/join/' + match_info.match_id + '/p2'}
                         style={{ width: "500px", textAlign: 'center'}}/>
                    </div>
                );
            }else{
                return (
                    <Match {...multimedia_data} isPlayer1={match_info.is_player1} 
                    finish={match_info.finish} winner={match_info.winner}/>
                );
            }
        } 
    };
}

export default Sender;
