//使用封装好的ajax模块
import ajax from './ajax'
//发送注册的异步请求
    export  let reqRegister = (user)=>(ajax('/api/register',user, 'POST'))
 //发送登陆的异步请求
     export let reqLogin = (user)=>(ajax('/api/login',user, 'POST'))
// 发送更新的异步请求
    export  let  update = (user)=>(ajax('/api/update',user, 'POST'))
    //发送cookie的ajax请求
     export  let  getuser =() =>(ajax('/api/getuser'))
     //查找user
      export  let  requser =(type)=>(ajax('/api/userlist',{data:type}))
      //接收所有的消息
       export  let  reqmsg =()=>(ajax('/api/getmsg'))
