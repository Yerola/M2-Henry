//(function () {

//(1)var whiteboard = window.whiteboard; acá traemos lo que exportamos de whiteboard
  //var whiteboard = require('./whiteboard')

  //con ES6
  import { whiteboard } from './whiteboard';


//(2)  var socket = window.io(window.location.origin); acá vamos a traernos lo que hay en scoket location, que es un paquete de node
  // var io = require('socket.io-client')

  //ES6
  import { io } from 'socket.io-client';
  var socket = io(window.location.origin)//acá guardamos en una variable la forma de activar el io

  socket.on('connect', function () {
    console.log('Connected!');
  });

  socket.on('load', function (strokes) {

    strokes.forEach(function (stroke) {
      var start = stroke.start;
      var end = stroke.end;
      var color = stroke.color;
      whiteboard.draw(start, end, color, false);
    });

  });

  socket.on('draw', function (start, end, color) {
    whiteboard.draw(start, end, color, false);
  });

  whiteboard.on('draw', function (start, end, color) {
    socket.emit('draw', start, end, color);
  });

//})();
