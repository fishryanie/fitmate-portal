import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: 'chat' })
export class ChatGateway {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() message: string): string {
    return message;
  }
}
