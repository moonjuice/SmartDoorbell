# SmartDoorbell

## Local Test
---
```
sudo docker run -it --rm --privileged --name smart-doorbell -v "$PWD":/usr/src/app -w /usr/src/app -p 10083:80 node:14 /bin/bash -c "npm install && npm start"
```
