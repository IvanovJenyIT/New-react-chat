const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

const messages = [];

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const newMessage = {
      key: messages.length,
      time: new Date().toLocaleTimeString(),
      ...JSON.parse(message)
    };
    messages.push(newMessage);
    wss.clients.forEach(el =>
      el.send(JSON.stringify({ type: 'message', message: newMessage }))
    );
    console.log('received: %s', newMessage)
  });
  ws.send(
    JSON.stringify({
      type: 'messages',
      messages: messages
    })
  )
});
