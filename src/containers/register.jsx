import React ,{Component} from 'react'
import {WingBlank, WhiteSpace,List, InputItem,Radio,Button} from 'antd-mobile'
import {connect}from'react-redux'
import {Redirect} from 'react-router-dom'
import Logo from './logo/logo'
import {Register}from '../redux/actions'

 class  Registers extends Component {
    //初始化
  state ={
      name:'',
     pwd:'',
     pwd2:'',
    type:'genius'

   }
   handleChange = (name,val)=>{
     this.setState({[name]:val})

   }
  handleOnclick =()=>{
//     调用异步请求
    this.props.Register(this.state)

}
   RedirectTo =()=>{
     this.props.history.replace('/login')
   }

    render(){
      const RadioItem = Radio.RadioItem;
       let {type}=this.state
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
              <InputItem  type="password" onChange ={val =>this.handleChange('pwd2',val)}>确认密码</InputItem>
              <WhiteSpace/>
              <RadioItem checked ={type ==='genius'} onChange ={() =>this.handleChange('type','genius')}>牛人</RadioItem>
              <WhiteSpace/>
              <RadioItem checked ={type ==='boss'} onChange ={() =>this.handleChange('type','boss')}>BOSS</RadioItem>
              <Button type="primary" onClick ={this.handleOnclick}>注册</Button>
              <WhiteSpace/>
              <Button onClick ={this.RedirectTo}>已经有账号</Button>
            </List>
          </WingBlank>
        </div>
      )
    }
    }

    export default connect(
      state =>(state.User), //获取更新的状态
      {Register} //获取异步请求的函数
    )(Registers)