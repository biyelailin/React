//写action的工厂函数：actioncreator
//引入ajax
import {reqRegister,reqLogin,update,getuser,requser,reqmsg} from '../api/ajax_index'
 import {ERROE_SMG,AUTH_SUCCESS,RECEIVE,INITDATA,USERLIST,RECEIVEUSERMSG,RECEMSG}from'./action-type'
import io from 'socket.io-client'



//同步action书写
     let    success   = (user)=>({type:AUTH_SUCCESS,data:user})
    let     error = (user)=>({type:ERROE_SMG,data:user})
    let    updateuser  = (user)=>({type:RECEIVE,data:user})
    export  let  initdata = (user)=>({type:INITDATA,data:user})


//数据库连接好，现在开始写异步请求


//异步请求：
/*1.有两种：注册异步请求 和登陆异步请求
   2.调用封装好的ajax
   3.要书写同步的action请求
   4.注册请求，从数据库得到的是user的对象{name pwd type}
               错误的从数据得到：{code：1 msg :'注册失败的信息'}
    5.分析可得：action对象的类型为注册成功 和注册错误两种类型
* */
//发送注册的异步请求
  export let  Register =({name, pwd, pwd2, type})=>(
    dispatch =>{
       if(!name ||!pwd){
         dispatch(error('用户名和密码不能为空'))
       }else if(pwd !== pwd2){
         dispatch(error('两次输入密码要一致'))
       }else{
         //  这里发送异步请求
         reqRegister({name, pwd, type}).then((response)=>{
           let {msg,data,code} = response.data
           if(code === 0){
             dispatch(success(data))
           }else{
             dispatch(initdata(msg))
           }
         })
       }



    }
 )

 export  let Login =(user)=>(
   dispatch =>{
     reqLogin(user).then(response=>{
       let {data,code,msg} =response.data
        if(code===1){
          dispatch(error(msg))

        }else{
          dispatch(success(data))
        }

     })
   }

 )
 //更新异步请求
   export  let updateUser = (user)=>{
       return dispatch =>{
           update(user).then(response=>{
               let {data,code,msg} = response.data
              if(code===1){
                dispatch(error(msg))
                 
              }else{
                  
                dispatch(updateuser(data))
              }
           })

       }
   }

   //发送cookie 异步请求

    export  let getUser =()=>{
       return dispatch =>{
         getuser().then(response=>{
            let result = response.data
            if(result.code === 0){

              dispatch(updateuser(result.data))
            }else{
              dispatch(error(result.msg))
            }
         })
       }

}
//书写同步请求
   let   UserList = (user)=>({type:USERLIST,data:user})
// 发送userlist的异步请求
  export  let getUserList =(type)=>{
    return dispatch =>{
           requser(type).then(response=>{
              let result = response.data
               if(result.code === 0){
                   dispatch(UserList(result.data) )
               }

           })

    }

  }
/*1.获取所有的会话，是一个数组:
 data:{user,[ {from ,to ,content,create_time, read,chat_id}]},....
*2.一条消息是：{from，to,create_time,read,chat_id}
*3.通过reducers进行储存
* */
//同步接收消息列表
 let  usermsgs = (data) =>({ type:RECEIVEUSERMSG,data:data})
//同步接收一条消息
let  recievemsg = (msg) =>({type:RECEMSG ,data:msg})
// 要获得所有的消息
  export  let  getUserMsg = ()=>(
      async  dispatch =>{
    //    书写异步请求
        let response =  await reqmsg()
         let {code,data} = response.data
          
         if(code === 0){
        dispatch(usermsgs(data))
         }
    }
  )

/*1.客户端向服务器接收和发布一条消息
* 2.要连接上服务器
* 3.订阅和发布原理进行发布和接收一条消息
* */
   //得到socket 对象， 并且连接到数据库
 let socket = io('ws://localhost:4000')

//接收服务器发送过来的消息
  export  let recivemsg=()=>{
  return dispatch =>{
      socket.on('receive', function (msg) {
      //这里都到的是一条完整的消息  data：{from to chat_id content read}
        
      dispatch(recievemsg(msg))
    })
  }
}

//向服务器发送消息,发送的消息从哪里来啊？，是用户输入的 要搜集的是 from to content
export let sendMsg =({from ,to,content})=>{
  return dispatch => {
    // 向服务器发送消息
    socket.emit('send', {content, from, to})
    console.log('浏览器向服务器发送消息', {content, from, to})
  }
 }




/*
// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:4000')

// 绑定'receiveMessage'的监听, 来接收服务器发送的消息
socket.on('receiveMessage', function (data) {
  console.log('浏览器端接收到消息:', data)
})

// 向服务器发送消息
socket.emit('sendMessage', {name: 'Tom', date: Date.now()})
*/

//测试




