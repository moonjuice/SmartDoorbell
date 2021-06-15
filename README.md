# SmartDoorbell

## Default Parameters

| Name | Value     |
| ---- | --------- |
| ROLE | client    |
| PIN  | 27        |
| PORT | 1883      |
| HOST | localhost |

## Create .env file in shared directory
including these information:
```
ROLE=client
PIN=22
PORT=1883
HOST=localhost
```
## Local Test

```
sudo docker run -it --rm --privileged --name smart-doorbell -v "$PWD":/usr/src/app -w /usr/src/app --env-file .env node:14 /bin/bash -c "npm install && npm start"
```

## Build Docker Image and Run

```
// build image
$ sudo docker build . -t smart-doorbell
// run docker image
$ sudo docker run --rm --privileged --env-file .env --name dev smart-doorbell:latest
```

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

## HomeAssistant auto create entity
1. 設定 -> 整合 -> Mosquitto broker -> 設定
2. 訂閱主題輸入 homeassistant/binary_sensor/smart_doorbell/config，然後開始訂閱
3. client 連上後就會自動新增 entity
