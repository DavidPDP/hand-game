import React from 'react';
import Cookies from 'universal-cookie';

class Match extends React.Component {
    sendMove = (e,move) => {
        e.preventDefault();
        let prefix = 'p2_';
        if(this.props.isPlayer1){
            prefix = 'p1_';
        }
        let cookies = new Cookies();
        let player_id = cookies.get(prefix + 'player_id');
        this.props.socket.ws.send(JSON.stringify({
            'type': 'send_move',
            'match_id': this.props.match_id,
            'move': move,
            'player_id': player_id
        }))
    };

    render(){
        return(
            <div>
                <img alt='mode' src={this.props.multimedia.url} width="300" height="350"/><br/><br/>
                {this.props.finish ? (<p>{this.props.winner + ' Winner'}</p>):(<br/>) }
                {this.props.multimedia.moves.map((move, i) => 
                <a key={i} href='/' onClick={e => this.sendMove(e,move.move)}>
                    <img alt={move.move} src={move.url + ""} width="150" height="150"/>
                </a>)}
            </div>
        );
    }
}

export default Match;