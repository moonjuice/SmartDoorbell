const role = process.env.ROLE || "client";
const pinNum = process.env.PIN || 22;
const portNum = process.env.PORT || 1883;
const host = process.env.HOST || "localhost";

if ("both" == role || "server" == role) {
    const aedes = require("aedes")();
    const { createServer } = require("aedes-server-factory");

    aedes.on("subscribe", function (subscriptions, client) {
        console.log(
            "MQTT client \x1b[32m" +
                (client ? client.id : client) +
                "\x1b[0m subscribed to topics: " +
                subscriptions.map((s) => s.topic).join("\n"),
            "from broker",
            aedes.id
        );
    });

    aedes.on("unsubscribe", function (subscriptions, client) {
        console.log(
            "MQTT client \x1b[32m" +
                (client ? client.id : client) +
                "\x1b[0m unsubscribed to topics: " +
                subscriptions.join("\n"),
            "from broker",
            aedes.id
        );
    });

    aedes.on("client", function (client) {
        console.log(
            "Client Connected: \x1b[33m" +
                (client ? client.id : client) +
                "\x1b[0m",
            "to broker",
            aedes.id
        );
    });

    aedes.on("clientDisconnect", function (client) {
        console.log(
            "Client Disconnected: \x1b[31m" +
                (client ? client.id : client) +
                "\x1b[0m",
            "to broker",
            aedes.id
        );
    });

    aedes.on("publish", async function (packet, client) {
        console.log(
            "Client \x1b[31m" +
                (client ? client.id : "BROKER_" + aedes.id) +
                "\x1b[0m has published",
            packet.payload.toString(),
            "on",
            packet.topic,
            "to broker",
            aedes.id
        );
    });

    const httpServer = createServer(aedes);

    httpServer.listen(portNum, function () {
        console.log("server listening on port ", portNum);
    });
}

if ("both" == role || "client" == role) {
    var Gpio = require("onoff").Gpio;
    var pushButton = new Gpio(pinNum, "in", "both");
    var mqtt = require("mqtt");
    var client = mqtt.connect("mqtt://" + host, {
        port: portNum,
    });
    client.on("connect", function () {
        console.log("connected");
    });

    pushButton.watch(function (err, value) {
        if (err) {
            console.error("There was an error", err);
            return;
        }
        console.log("button value:" + value);
        client.publish("btn", value.toString());
    });
}
