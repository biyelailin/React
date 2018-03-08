/*boss页面信息完善功能组件

* */
import  React,{Component}from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect}from 'react-redux'
import {updateUser}from '../../redux/actions'
import  AvatarList from '../../components/avatar-list/avatar-list'
  class Bossinfo extends Component {
    //对提交的信息进行搜所，然后发送异步请求
     state ={
       //   头像
       avatar:'',
      //  技能描述
       desc:'',
       //  工资
       money:'',
      //   公司名称
       company:'',
      //  职称 b
       title:''


     }
    HasAvatars = (text)=>{
      //   更新头像数据
      this.setState({
        avatar:text
      })
    }
    handleChange =(name,val)=>{
       this.setState({
            [name]:val
       })
  }

   save =()=>{
       this.props.updateUser(this.state)
   }

    render(){
      // 如果信息完善的话，要跳转到响应的面板上
         let {avatar} =this.props.users
          if(avatar){
            this.props.history.replace('./boss')
            return null
          }
      return(
        <div>
          <NavBar>BOSS 信息完善</NavBar>
           <AvatarList  avatars ={this.HasAvatars} />
          <InputItem  onChange ={val=>this.handleChange('title',val)}>招聘职位：</InputItem>
          <InputItem onChange ={val=>this.handleChange('company',val)}>公司名称：</InputItem>
          <InputItem  onChange ={val=>this.handleChange('money',val)}>职位薪资：</InputItem>
          <TextareaItem
             title="职位要求"
             rows={3}
             onChange ={val=>this.handleChange('desc',val)}
          />
           <Button type="primary" onClick ={this.save}>保存</Button>

        </div>
      )
    }
    }
export default connect(
  state=>({users:state.User}),
  {updateUser}
)(Bossinfo)
