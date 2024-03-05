interface CallbackInterface {
  (...args: any[]): void;
}

class EventBus {
  private listeners: Record<string, CallbackInterface[]>;
  constructor() {
    this.listeners = {};
  }
  on(eventName: string, callback: CallbackInterface): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  off(eventName: string, callback: CallbackInterface): void {
    if (!this.listeners[eventName]) {
      throw new Error(`No events with this name: ${eventName}`);
    }
    this.listeners[eventName] = this.listeners[eventName].filter((listener) => listener !== callback);
  }
  emit(eventName: string, ...args: any[]): void {
    const eventListeners = this.listeners[eventName];
    if (!eventListeners) {
      // throw new Error(`No events with this name: ${eventName}`);
      return;
    }

    eventListeners.forEach((listener) => listener(...args));
  }
}

export default EventBus;
