/*创建mongoodb数据库
  1.安装npm --save-dev mongoose
  2.引入mongoose
  3.创建数据库
  4.创建Schema函数，设置数据的类型
  5.创建集合
  6.添加数据
   7.对数据的增删改查
* */
let mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/boss_zz")
mongoose.connection.on("open",function(){
  console.log("已连接数据库")
})
//创建Schema对象，设置数据的类型
let bossSchema = mongoose.Schema({
  //  用户名
name:{type:String,required:true},
//  密码
pwd:{type:String,required:true},
//  类型
type:{type:String},
//   头像
avatar:{type:String},
//  技能描述
desc:{type:String},
//  工资
money:{type:String},
//   公司名称
company:{type:String},
//  职称 b
title:{type:String}

})

//创建一个新的集合，chatmsg
let chatSchema = mongoose.Schema({
  from:{type:String,required:true} ,
  to:{type:String,required:true},
  content:{type:String,required:true},
  chat_id:{type:String,required:true},
  create_time:{type:Number,required:true}

})

//创建model映射集合
let UserModel =mongoose.model('user',bossSchema)
let chatmsg = mongoose.model('chatmsg',chatSchema)
//暴露集合,这样可以读多个model,可以直接使用
module.exports ={
   getModel(name){
       return mongoose.model(name)
   }
}


