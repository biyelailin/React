
import React, {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
 import  {connect} from 'react-redux'
import  {sendMsg, recivemsg,getUserMsg} from '../../redux/actions'
import {aaa} from '../../api/ajax_index'


const Item = List.Item

/*1.服务器和客户端通过socket.io 进行数据的发送
* 2.发送数据，封装在一个函数中，要接收页面的参数
* 3.就收数据是通过reducer进行状态的更新
* 4.页面要呈现是什么？
* 5.点击列表跳转到chat聊天页面
* 6.要在聊天页面处显示聊天的信息
* 聊天页面要显示的是：from 头像  聊天内容     to  聊天内容 姓名
* */

 class Chat extends Component {
    state ={
      content :''
    }


  // 发送一条消息
   handleSubmit = () => {
    let content = this.state.content
    let from= this.props.user._id
    let to = this.props.match.params.userid
     this.props.sendMsg(from,to,content)
      this.setState({content:''})

  }
   //接收一条消息
    componentDidMount(){
      this.props.recivemsg()
      this.props.getUserMsg()
    }

render() {
    // 获取目标id
   /* let userid = this.props.match.params.userid
    //获取当前登录用户的user
     let meid = this.props.user._id
    //获取from 和to的聊天记录
     let chat_id = [meid,userid].sort().join('_')
     let {msgs, users} = this.props.chat
     console.log(this.props.chat)

    //得到了当前from 和to 的所有的回话，然后在进行显示
     let currentmsg = msgs.filter(msg=>(msg.chat_id === chat_id))
    //获取to的头像和me 的头像
      let  meavatar =  this.props.user.avatar
        debugger
       //let  toavatar =  users[userid].avatar
       //toavatar ? require(`../../assets/imgs/${toavatar}.png`) : null
         */
    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          <Item
            thumb={require('../../assets/imgs/boy.png')}
          >
            你好
          </Item>
          <Item
            thumb={require('../../assets/imgs/boy.png')}
          >
            你好2
          </Item>
          <Item
            className='chat-me'
            extra={<img src={require('../../assets/imgs/girl.png')}/>}
          >
            很好
          </Item>
          <Item
            className='chat-me'
            extra={<img src={require('../../assets/imgs/girl.png')}/>}
          >
            很好2
          </Item>
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            extra={
              <span onClick={this.handleSubmit}>发送</span>
            }
             vaule ={this.state.contnet}
            onChange ={val=>{this.setState({content:val})}}
          />
        </div>
      </div>
    )
  }



}

export default connect(
   state =>({chat:state.Chat,user:state.User}),
{sendMsg,  recivemsg, getUserMsg}

)(Chat)
// 引入客户端io
