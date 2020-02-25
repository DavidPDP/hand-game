import React from 'react';
import GameModes from './GameModes'
import Match from './Match'
import logo from '../logo.svg';
import WebsocketController from './WebsocketController';

const match_info = {
    socket: new WebsocketController(1),
    game_mode_visible: true,
    opponent_url_visible: true,
    match_id: '',
    start_match: false
}

const multimedia_data = {
    multimedia: '',
    socket: '',
    match_id: ''
}

console.log(match_info)

class Sender extends React.Component {
    componentDidMount(){
        this.connection = match_info.socket.ws;
        
        this.connection.onmessage = evt => { 
            var message = JSON.parse(evt.data);
            console.log(message)
            if(message.type === 'create_match'){
                match_info.game_mode_visible = false;
                match_info.match_id = message.match_id;
                multimedia_data.multimedia = message.multimedia
                multimedia_data.socket = match_info.socket
                multimedia_data.match_id = match_info.match_id
                this.forceUpdate();
            }else if(message.type === 'join_match'){
                match_info.opponent_url_visible = false
                multimedia_data.multimedia = message.multimedia
                multimedia_data.socket = match_info.socket
                multimedia_data.match_id = match_info.match_id
                this.forceUpdate();
            }else if(message.type === 'match_finished'){

            }
        }
        this.connection.onopen = evt => {
            if(!this.props.isPlayer1){
                console.log(match_info)
                match_info.socket.ws.send(JSON.stringify({
                    'type': 'join_match',
                    'match_id': this.props.match.params.match_id,
                    'player_id': this.props.match.params.match_id + 'p2'
                }))
                match_info.game_mode_visible = false;
                match_info.opponent_url_visible = false;
                match_info.match_id = this.props.match.params.match_id
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
                return <Match {...multimedia_data}/>
            }
        } 
    };
}

export default Sender;