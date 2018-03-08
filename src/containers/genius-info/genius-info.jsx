import  React,{Component}from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import  {updateUser} from '../../redux/actions'

import  AvatarList from '../../components/avatar-list/avatar-list'
class Geniusinfo extends Component {
  //初始化数据
     state ={
       //  职称 b
       title:'',
       //  技能描述
       desc:'',
       avatar:''
     }
      handleChange =(name,val)=>{
         this.setState({
           [name]:val
         })

      }
     HasAvatars =(text)=>{
          this.setState({
            avatar:text
          })
      }
       save =()=>{
       //   把保存的数据通过异步请求提交到数据库
           this.props.updateUser(this.state)
       }
  render(){
      let {avatar} =this.props.users
       if(avatar){
        this.props.history.replace('./genius')
         return null
    }
    return(
      <div>
        <NavBar >牛人信息完善</NavBar>
        <AvatarList  avatars ={this.HasAvatars}/>
        <InputItem onChange ={val=>{this.handleChange('title',val)}}> 求职岗位：</InputItem>
        <TextareaItem
          title="个人简介"
          rows={3}
          onChange ={val=>{this.handleChange('desc',val)}}
        />
        <Button type="primary" onClick ={this.save}>保存</Button>

      </div>
    )
  }
}
//在这里建立连接
export default  connect(
   state =>({users:state.User}),
  {updateUser}
)(Geniusinfo)