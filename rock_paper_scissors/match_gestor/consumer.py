# Because multiple matches may be running at the same time, 
# the reactive programming model needs to be adopted. 
# Thus, this consists of managing system flows asynchronity. 
# In this particular case, there is a bi-directional interaction, 
# so Websockets are used to optimize resources.
#from channels.consumer import AsyncConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
from .match import create_player, get_player, create_match, get_match, join_match
from .match_api import get_game_multimedia_api, get_match_winner_api
from asgiref.sync import async_to_sync

class MatchConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'macth_message'
        print('Room',self.room_group_name)
        print('Room',self.channel_name)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        
    
    async def receive(self, text_data):
        message = json.loads(text_data)
        print(message)
        print(self.scope['url_route']['kwargs']['username'] + 
                self.scope['url_route']['kwargs']['usertype'])
    
        if message['type'] == 'create_match':
            create_player(self.scope['url_route']['kwargs']['username'] + 
                self.scope['url_route']['kwargs']['usertype'])
            player = get_player(self.scope['url_route']['kwargs']['username'] + 
                self.scope['url_route']['kwargs']['usertype'])
            game_type = message['game_type']
            match_id = create_match(player, game_type)
            multimedia = get_game_multimedia_api(game_type)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'match_message',
                    'message': json.dumps({
                        'type': 'create_match', 
                        'match_id': match_id, 
                        'multimedia': multimedia
                    })
                }
            )
        elif message['type'] == 'join_match':
            create_player(self.scope['url_route']['kwargs']['username'] + 
                self.scope['url_route']['kwargs']['usertype'])
            player = get_player(self.scope['url_route']['kwargs']['username'] + 
                self.scope['url_route']['kwargs']['usertype'])
            match = get_match(message['match_id'])
            join_match(player,match)
            multimedia = get_game_multimedia_api(match.game_type)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'match_message',
                    'message': json.dumps({
                        'type': 'join_match',
                        'match_id': match.id,
                        'multimedia': multimedia
                    })
                }
            )
        elif message['type'] == 'send_move':
            print('ENVIA MOVE')
            match = get_match(message['match_id'])
            player = get_player(self.scope['url_route']['kwargs']['username'] + 
                self.scope['url_route']['kwargs']['usertype'])
            match.register_player_move(player,message['move'])
            print(match.is_match_completed())
            print(match.player1_move)
            print(match.player2_move)
            if match.is_match_completed():
                print('TERMINADO')
                winner = get_match_winner_api(match)
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'match_message',
                        'message': json.dumps({
                            'type': 'match_finished',
                            'match_id': match_id,
                            'winner': winner
                        })
                    }
                )        
        else:
            pass

    async def match_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=message)

