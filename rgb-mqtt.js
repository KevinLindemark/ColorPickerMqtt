// Setup
const broker = "influx.itu.dk";
const port = 9002;
const secured = true;
const topic = "ituF2020/EXPD/group19";
const clientId = "clientID_" + parseInt(Math.random() * 1000);

// Create a client instance
let client = new Paho.MQTT.Client(broker, Number(port), clientId);

// connect the client
client.connect({ 
  onSuccess: onConnect,
  useSSL: secured,
});

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = receiveMessage;

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(topic);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost: " + responseObject.errorMessage);
  }
}

// call to send a message
function sendMessage(msg) {
  console.log("sending: " + msg);
  let mObj = {deviceId: clientId, content: msg};
  let mSend = new Paho.MQTT.Message(JSON.stringify(mObj));
  mSend.destinationName = topic;
  client.send(mSend);
}

// called when a message arrives
function receiveMessage(msg) {
  console.log(msg);
  let mUnpack = JSON.parse(msg.payloadString);
  let senderId = mUnpack.deviceId;
  let receivedMessage = mUnpack.content;

  console.log("received: " + receivedMessage);
}