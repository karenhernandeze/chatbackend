const express = require("express");
const { ok } = require("assert");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Servidor HTTP
const http = require("http").Server(app);

// Servidor para socket.io, aquí RECIBIMOS mensajes
// Nos aseguramos que podemos recibir referencias cruzadas

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = 2021;

var mensajes = [];

// Se usa para ENVIAR mensajes
var socketOut = null;

app.get("/", (req, res) => {
  res.send("ASCP framework");
});

// Permitimos JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.post("/test", (req, res) => {
  console.log("Got body:", req.body);
  res.sendStatus(200);
});

// Conectar a otro host
app.get("/conectar", (req, res) => {
  console.log(req.query.host);
  res.send("Host " + req.query.host);
  socketOut = ioc.connect(req.query.host);
  console.log(socketOut);
});

// Enviar mensaje al host al que se encuentra conectado
app.get("/enviar_mensaje", (req, res) => {
  res.send("Mensaje " + req.query.msg);
  socketOut.emit("Mensaje ASCP", req.query.msg);
});

//Enviar mensaje al host al que se encuentra conectado
app.post("/enviar_mensaje", (req, res) => {
  console.log("Got body:", req.body);
  res.send("Mensaje: " + req.body.data);
  socketOut.emit("Mensaje ASCP", req.body);
});

// Obtener el último mensaje
app.get("/obtener_ultimo_mensaje", (req, res) => {
  res.send("Ultimo: " + mensajes[mensajes.length - 1]);
});

// Recibir mensajes
io.on("connection", (socket) => {
  socket.on("Mensaje ASCP", (ascp_msg) => {
    console.log(socket.id + " " + JSON.stringify(ascp_msg));
    mensajes.push(ascp_msg);
  });
});
// Escuchar en el puerto especificado en la línea de comandos
http.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}/`);
});
