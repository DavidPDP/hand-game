import Cookies from 'universal-cookie';

const cookies = new Cookies();

class WebsocketController{
    constructor(usertype) {
        this.id = cookies.get('player_id');
        this.ws = new WebSocket('ws://localhost:8000/match/' + this.id + '/' + usertype);
    }
}

export default WebsocketController