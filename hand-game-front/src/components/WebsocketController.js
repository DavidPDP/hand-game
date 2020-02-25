import Cookies from 'universal-cookie';

const cookies = new Cookies();

class WebsocketController{
    constructor(usertype) {
        this.id = cookies.get('player_id');
        this.ws = new WebSocket('ws://floating-badlands-34324.herokuapp.com/match/' + this.id + '/' + usertype);
    }
}

export default WebsocketController