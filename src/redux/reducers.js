//写对个reducer的函数
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROE_SMG,RECEIVE,INITDATA,USERLIST,RECEIVEUSERMSG,RECEMSG} from'./action-type'
import {redirect} from '../utils/path/index'
//根据anction对象传过来的数据分析可得
let initState ={
  name:'',
  pwd:'',
  type:'',
  msg:'',
  redirectTo:''

}



 function User(state =initState,action){
   switch (action.type){
     case AUTH_SUCCESS:
        let {avatar,type} =  action.data
        return  {...action.data,redirectTo: redirect(avatar,type) }     //更新状态，通过redirectTo来调转页面
     case ERROE_SMG :
       return {...state, msg:action.data}
     case RECEIVE:
        return  action.data //返回一个新的user
     case INITDATA:
       return  {...initState,msg:action.data} //返回一个新的user

     default:
         return state
   }
}
//创建user列表reduce函数
 let  initUserList= []
   function UserList (state=initUserList,action){

  switch (action.type){
    case  USERLIST:
       return  action.data
    default :
       return state

  }

  }

//  创建chat 列表
 let initChat ={
     users:{},
     msgs:[]
 }

 function Chat (state =initChat ,action){
     switch (action.type){
       case  RECEIVEUSERMSG:
         return action.data//填写的是全部的以userid：user 所有的user 和当前登录的用户发送和接收的消息
       case RECEMSG:
          return{...state,msgs:[...state.msgs, action.data]}

       default :
         return  state
     }
 }

export default combineReducers({
  User,
  UserList,
  Chat
})
/*判断要跳转到哪个路由
* */

