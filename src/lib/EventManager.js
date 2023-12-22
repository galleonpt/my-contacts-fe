class EventManager {
  constructor() {
    this.listeners = { };
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  emit(event, payload) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(payload);
    });
  }

  removeLister(event, listenerToRemove) {
    const eventListeners = this.listeners[event];

    if (!eventListeners) {
      return;
    }

    const filteredListeners = eventListeners.filter((listener) => listener !== listenerToRemove);

    this.listeners[event] = filteredListeners;
  }
}

export default new EventManager();

const toastEventMAnager = new EventManager();

const temp = (payload) => console.log(payload);

toastEventMAnager.on('addtoast', temp);

toastEventMAnager.emit('addtoast', { type: 'danger', text: 'Text' });

toastEventMAnager.removeLister('addtoast', temp);

console.log(toastEventMAnager);
