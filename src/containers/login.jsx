import React ,{Component} from 'react'
import {WingBlank, WhiteSpace,List, InputItem,Button} from 'antd-mobile'
import {connect}from'react-redux'
import {Redirect} from 'react-router-dom'
import Logo from './logo/logo'
import {Login}from '../redux/actions'
 class Logins extends Component {
  state ={
    name:'',
    pwd:'',
  }
  handleChange = (name,val)=>{
    this.setState({[name]:val})

  }
  handleOnclick =()=>{
    this.props.Login(this.state)
  }
   RedirectTo =()=>{
       this.props.history.replace('/register')
   }
  render(){
    let {msg,redirectTo} = this.props
    if(redirectTo){
      return <Redirect to ={redirectTo}/>
    }
    return(
      <div>
        <Logo/>
        <WingBlank>
          { msg? <p className="Err_msg">{msg}</p> :null}
          <List>
            <InputItem type="text" onChange ={val =>this.handleChange('name',val)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem  type="password" onChange ={val =>this.handleChange('pwd',val)}>密 码</InputItem>
            <WhiteSpace/>
            <Button type="primary" onClick ={this.handleOnclick}>登陆</Button>
            <WhiteSpace/>
            <Button  onClick ={this.RedirectTo}>还没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state =>(state.User), //获取更新的状态
  {Login} //获取异步请求的函数
)(Logins)