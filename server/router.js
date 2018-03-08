/*在express 和数据库MongoDB连接以后，要想外暴露API接口
* 1.API接口：包括4部分
*    地址，请求参数，传递参数 还要返回的数据
* */
//引入express
let express = require('express')
//引入model的模型，是映射的集合
let models = require('./model')
//引入加密模式
 let md5 = require('blueimp-md5')
let userModels = models.getModel('user')
let chatmsg = models.getModel('chatmsg')
let router = express.Router()
//创建对象，进行过滤密码,这是一个过滤对象，直接写要过滤的属性，并属性值为0
let _filter ={pwd:0,_v:0}
//这里书写的是登陆和注册的路由
/*书写；路由的步骤
  1.从前台获取数据
  2.在数据库查找
  3.返回数据
* */
/*问题：判断是否存在数据,不存在的话，进行添加数据库，如果存在就返回已存在的数据信息，
      存在的话，返回的是msg:'用户已存在' 不存在的话，数据库添加后，返回数据是：user ，是一个用户的注册信息
      返回这些有什么用呢？
      在异步请求发送的数据是和数据库进行交互，返回的是数据在通过anction传给reducer进行更改，进行页面的显示操作
* */

//注册路由
 router.post('/register',function(req,res){
 //   1.从前台获取数据
      let {name,pwd,type} = req.body
 //  对数据进行判断
 //   1.在数据库进行查找
  userModels.findOne({name},function(err,user){

               if(user){
                 //    1.存在
                 return res.send ({code:1,msg:'用户已存在'})
               }

                 //  2.不存在,进行存储，返回user 数据，但是一般不包括密码
                    let userModel = new userModels({name,type,pwd:md5(pwd)})
                       userModel.save(function(err,user){
                          res.cookie('userId',user._id)
                       //要进行数据返回,为的是更改通过anction传给reducer函数
                         res.send({code:0,data:{id:user._id,name,type:type}})
                       })


        })
 })
 router.post('/login',function(req,res){
                   let {name,pwd} =req.body
               //  进行查找数据是否存在
         userModels.findOne({name,pwd:md5(pwd)},_filter,function(err,user){
                   //  不存在

                   if(!user){
                       res.send({code:1,msg:'账号或密码不存在'})
                    }else{
                     //  存在
                     res.cookie('userId',user._id)
                     res.send({code:0,data:user})

                   }


                 })


 })

 //注册boss完整信息路由
router.post('/update',function(req,res){

//    获取cookie中的id
        let userId =req.cookies.userId
       if(!userId){
       //  不存在
          return  res.send({code:1,msg:'请登录'})
       }
//           如果存在进行查找
  userModels.findByIdAndUpdate({_id:userId},req.body,function(err,user){
     // 如果不存在，返回错误信息，并删除cookie
        if(!user){
          res.clearCookie('userId') //删除cookie是传入名字即可
           res.send({code:1,msg:'请登录'})

        }else {
        //   如果存在，并进行对user进行拼装
              let {name,_id,type} = user
              user = Object.assign({}, req.body, {_id, name, type})
             res.send({code:0,data:user})

        }
  })

})
 //注册通过cookie来找user的路由
  router.get('/getuser',function(req,res){
       let userId = req.cookies.userId
    userModels.findOne({_id:userId},function(err,user){
      if(user){

        res.send({code:0,data:user})
      }else{
         res.clearCookie(userId)
         res.send({code:1,msg:'请登录'})
      }
    })

  })

 //获取所有符合要求的user
router.get('/userlist',function(req,res){
// 读取发送的type类型的请求
    let type= req.query.data
//   在数据库中进行查找
  userModels.find({type},function(err,user){
      if(user){
        res.send({code:0,data:user})
      }else{

        res.send({code:1,msg:'没有查到'})
      }

  })

})

 //从chatmsg集合中获取所有的msg
router.get('/getmsg',function(req,res) {
  let userid = req.cookies.userId
//  通过userid 可以查找到消息
 
  userModels.find({}, function (err, userdoc) {
    let users = {}
     userdoc.forEach(user => {
      users[user._id] = {name: user.name, avatar: user.avatar}
    })
    //查到的是与该用户所有有关的msg ,user 是所有的用户
    chatmsg.find({'$or': [{from: userid}, {to: userid}]}, function (err, msgs) {

      //返回给异步请求
       return res.send({code: 0,  data:{msgs, users}})

    })
    })

})
/*----------------------------------------------------------------------------------------*/

 //想外暴露
   module.exports =router