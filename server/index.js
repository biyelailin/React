/*搭建express服务器
 1.下载 npm i --save-dev express
 2.引入express服务器
 3.创建app应用
 4.设置默认中间件
 5.设置端口号
* */
//引入express服务器
let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let router  = require('./router')
let  models = require('./model')
let chatmsg =  models.getModel('chatmsg')
//创建app应用
let app = express()
//得到服务器对象
let server = require('http').Server(app)
//得到io对象
let io = require('socket.io')(server)
//配置cookie
 app.use(cookieParser())
//设置body-parser
app.use(bodyParser.json()) // 解析请求体(ajax请求: json数据格式)
app.use(bodyParser.urlencoded({extended:false})) //解析请求体表单数据

//通过io对象连接，得到socket
io.on('connection',function(socket){
//   绑定监听，接收信息
     socket.on('send',function(data){
             const {from, to, content} = data
            let chat_id =[from,to].sort().join('_') //变成from_to 或者to_from \
             let create_time  = Date.now()
             let ChatMsg = new chatmsg({chat_id,from,to,create_time ,content})
             ChatMsg.save(function(err,msg){
            // 通过数据库向客户端发送一条消息
            io.emit('receive',msg)
             })
     })
})

//访问路由
app.use('/api',router)
//设置端口号
server.listen(4000, () => {
  console.log('服务器启动成功 port: 4000')
})
/*let express = require('express')
let app = express()
// 得到服务器对象
const server = require('http').Server(app)
// 得到IO对象
const io = require('socket.io')(server)

io.on('connection', function(socket) {
  console.log('soketio connected')
  // 绑定sendMsg监听, 接收客户端发送的消息
  socket.on('sendMsg', function(data) {
    console.log('服务器接收到浏览器的消息', data)
    // 向客户端发送消息(名称, 数据)
    io.emit('recvMsg', data)
    console.log('服务器向浏览器发送消息', data)
  })
})


// 启动服务器监听
server.listen(4000, () => {
  console.log('服务器启动成功 port: 4000')
})*/
