import EventBus from "./EventBus";

export enum WSTransportEvents {
  Connected = "connected",
  Error = "error",
  Message = "message",
  Close = "close",
}

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;
  private pingInterval: any = 0;

  constructor(private url: string) {
    super();
  }
  public send(data: unknown): void {
    if (!this.socket) {
      throw new Error("Socket is not connected");
    }
    this.socket.send(JSON.stringify(data));
  }
  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }
  public close(): void {
    this.socket?.close();
  }
  private setupPing(): void {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, 5000);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }
  private subscribe(socket: WebSocket): void {
    socket.addEventListener("open", () => {
      this.emit(WSTransportEvents.Connected);
    });
    socket.addEventListener("close", () => {
      this.emit(WSTransportEvents.Close);
    });
    socket.addEventListener("error", (event) => {
      this.emit(WSTransportEvents.Error, event);
    });
    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type && data.type === "pong") {
          return;
        }
        this.emit(WSTransportEvents.Message, data);
      } catch (e) {
        console.error(e);
      }
    });
  }
}
