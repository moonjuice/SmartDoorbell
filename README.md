# SmartDoorbell

## Local Test

```
sudo docker run -it --rm --privileged --name smart-doorbell -v "$PWD":/usr/src/app -w /usr/src/app -e ROLE=both -p 1883:1883 node:14 /bin/bash -c "npm install && npm start"
```

## Default Parameters

| Name | Value     |
| ---- | --------- |
| ROLE | client    |
| PIN  | 22        |
| PORT | 1883      |
| HOST | localhost |

## Subscriber Sample

```
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost");
client.on("connect", function () {
    console.log("connected");
    client.subscribe("btn");
});
client.on("message", function (topic, message) {
    let context = message.toString();
    console.log("Message Received:", context);
});
```
