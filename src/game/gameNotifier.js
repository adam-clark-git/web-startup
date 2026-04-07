const DrawingEvent = {
  System: 'system',
  DrawingFinished: 'drawing_finished',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class DrawingEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

    this.socket.onopen = () => {
      console.log('WebSocket connected!');
      this.receiveEvent(new EventMessage('System', DrawingEvent.System, { msg: 'connected' }));
    };

    this.socket.onclose = () => {
      this.receiveEvent(new EventMessage('System', DrawingEvent.System, { msg: 'disconnected' }));
    };

    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
    
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    console.log('Sending event:', event);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    console.log('Received event:', event);
    this.handlers.forEach((handler) => handler(event));
  }
}

const DrawingNotifier = new DrawingEventNotifier();
window.DrawingNotifier = DrawingNotifier; // add this line
window.DrawingEvent = DrawingEvent; 
export { DrawingEvent, DrawingNotifier };