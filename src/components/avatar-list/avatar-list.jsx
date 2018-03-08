//显示图标
/*1.显示了静态的的页面
2.要点击图标以后，要显示在列表头部，是一个动态的显示
3.在Grid标签中的回调函数是参数是对象和index数值

*/
import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

  export default class AvatarList extends Component {
    //初始化状态存储数据
     state ={
       icon :null,
       text :''
     }
  static propTypes ={
      avatars:PropTypes.func.isRequired
    }


    //图片显示是在挂载第一次以后显示
    componentWillMount(){
      this.avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',')
        .map(text =>(
          {icon:require(`../../assets/imgs/${text}.png`),
             text
          }
        ))
    }
      //更新状态
    handleClick =(item)=>{
          this.setState({
             icon:item.icon,
          })
       this.props.avatars(item.text)

  }


      render(){
      //显示头像
          let {icon} = this.state
      return(
        <List renderHeader={()=>icon ? <span>选择头像是：<img src={icon} alt="avatar"/></span> :'请选择头像'}>
          <Grid
            columnNum ={5}
            data ={this.avatarList}
            onClick={this.handleClick}
          />

        </List>
      )
    }
    }