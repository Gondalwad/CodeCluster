import http from 'node:http';
import { WebSocketServer } from 'ws';

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/api/proctor/snapshot' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      console.log('[snapshot] received', body.length, 'bytes');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, received: true }));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, message: 'Not found' }));
});

const wss = new WebSocketServer({ server, path: '/ws/proctor/default' });

wss.on('connection', (socket) => {
  console.log('[ws] client connected');
  socket.send(JSON.stringify({ type: 'connected', message: 'stub backend ready' }));

  socket.on('message', (message) => {
    console.log('[ws] received', message.toString());
    socket.send(JSON.stringify({ type: 'received', ok: true }));
  });

  socket.on('close', () => {
    console.log('[ws] client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Proctoring stub backend listening on http://localhost:${port}`);
  console.log('WebSocket endpoint: ws://localhost:8080/ws/proctor/default');
});
