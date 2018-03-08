import  io from 'socket.io-client'

 let socket = io('ws://localhost:4000')
socket.on('receive' ,function(data){
  console.log('浏览器接收到的消息')
})
 socket.emit('send',{name:'lvlipeng'})