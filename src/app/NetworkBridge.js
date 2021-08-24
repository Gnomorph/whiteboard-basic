import { io } from "socket.io-client";

// The "draw" action is used on the network side to communicate with the server
// The "send" action is used to move message from bus to server
// The "recieve" action is used to distribute messages from the serve
class NetworkBridge {
    constructor(bus) {
        this.bus = bus;

        this.socket = io("localhost:3000");

        // incoming packets from the network
        this.socket.on('message', this.receive.bind(this));

        // internal packets destined for the network
        this.bus.subscribe("draw", this.send.bind(this));
    }

    send(data) {
        this.socket.emit("message", data);
    }

    receive(msg) {
        this.bus.publish("draw", msg);
    }
}

export {
    NetworkBridge
}
