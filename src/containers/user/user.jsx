import React,{Component} from 'react'
import  {Result,List,Modal,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import {initdata } from '../../redux/actions'
import  Cookies  from'browser-cookies'

let Item = List.Item
let  Brief = Item.Brief;

class User extends Component {

  handleClick =()=>{
//     退出登录，清空状态数据
    let {user} = this.props
    let {name} =this.props.user
    Modal.alert('注销', `${name}，你确定要退出吗？`,
      [
        { text: '取消',onPress: () => console.log('cancel')},
        { text: '确定', onPress: () =>{
          
          Cookies.erase('userId')
          this.props.initdata()
        }
        },
      ]);


  }
  render(){
    // 读取user
    let {avatar,name,company,title,desc,money}  = this.props.user
    return(
      <div>
        <Result
          img={<img src ={require(`../../assets/imgs/${avatar}.png`)} style ={{width:50}}/>}
          title={name}
          message={company ? company :null}
        />
        <List renderHeader={() => '相关信息'} className="my-list">
          <WhiteSpace/>
          <Item >
            <Brief>职位：{title}</Brief>
            <Brief>简介：{desc}</Brief>
            <Brief>{money? <span>薪资：{money}</span>:null}</Brief>
          </Item>
          <WhiteSpace/>
          <Item  onClick ={this.handleClick}>
            退出登录
          </Item>

        </List>

      </div>
    )
  }
}
export default  connect(
  state => ({user:state.User}),
  {initdata }
)(User )