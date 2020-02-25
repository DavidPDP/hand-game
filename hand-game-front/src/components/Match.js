import React from 'react';

class Match extends React.Component {
    sendMove = (e,move) => {
        e.preventDefault();
        this.props.socket.ws.send(JSON.stringify({
            'type': 'send_move',
            'match_id': this.props.match_id,
            'move': move
        }))
    };

    render(){
        return(
            <div>
                <img alt='mode' src={this.props.multimedia.url} width="100" height="100"/>
                {this.props.multimedia.moves.map((move, i) => 
                <a key={i} href='/' onClick={e => this.sendMove(e,move.move)}>
                    <img alt={move.move} src={move.url + ""} width="100" height="100"/>
                </a>)}
            </div>
        );
    }
}

export default Match;