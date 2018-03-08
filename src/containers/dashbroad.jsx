import React ,{Component} from 'react'
import Bossinfo from './boss-info/boss-info'
import Geniusinfo from './genius-info/genius-info'
import {Route,Switch} from 'react-router-dom'
import  cookies from 'browser-cookies'
import {connect}  from 'react-redux'
import   Boss  from './boss/boss'
import  Genius from './genius/genius'
import  {redirect} from '../utils/path/index'
import  {getUser} from '../redux/actions'
import {NavBar} from 'antd-mobile'
import  NavFoot from '../components/navfooter/navfoot'
import Msg from './msg/msg'
import  User from './user/user'
import Chat from './chat/chat'


 class Dashbroad extends Component {
   // 给组件对象添加navList属性: this.navList获取

   navList = [
     {
       path: '/boss', // 路由路径
       component: Boss,
       title: '牛人列表',
       icon: 'boss',
       text: '牛人',
       hide: false
     },
     {
       path: '/genius', // 路由路径
       component: Genius,
       title: 'BOSS列表',
       icon: 'job',
       text: 'BOSS',
       hide: false
     },
     {
       path: '/msg', // 路由路径
       component: Msg,
       title: '消息列表',
       icon: 'msg',
       text: '消息',
     },
     {
       path: '/me', // 路由路径
       component: User,
       title: '个人中心',
       icon: 'user',
       text: '我',
     }
   ]
   //判断只有cookie没有user
   componentDidMount(){
     let cookie = cookies.get('userId')
     let {user} = this.props
     if(cookie&&!user._id){
     // 发异步请求找user
       this.props.getUser()
     }
   }


  render(){
    //如果cookie和user都没有要跳转到登陆页面
    //要得到cookie  和 user通过任意类型得到
       let cookie = cookies.get('userId')
    //  得到user，通过 reducer中获得对象
      let {user,location} = this.props
    // 进行判断，并返回到登陆页面
      if(!cookie&&!user.type){
       this.props.history.replace('/login')
        return null
      }
    //  以下进行判断进入那个路由组件来渲染
        if(user.type){
        //   要进入的路径
           if(location.pathname === '/'){ //进入的是主面板
             let path=  redirect(user.avatar,user.type)
             this.props.history.replace(path)
             return null
           }
          // 判断要显示的路由和头部和底部的列表
          if(user.type ==='boss'){
            // 显示boss的对象
            this.navList[1].hide =true
          }else{
            //显示牛人的对象
            this.navList[0].hide =true
          }

        }else{
          return null
        }



    //    显示当前所在的路由

       let currentNav = this.navList.find(nav=> (nav.path === location.pathname) )


    return(
      <div>
        { currentNav ? <NavBar>{currentNav.title}</NavBar> :null}

        <Switch>

          <Route path ='/geniusinfo' component ={Geniusinfo}/>

          <Route path ='/bossinfo' component ={Bossinfo}/>
          <Route path ='/chat/:userid' component ={Chat}/>
          {
            this.navList.map((nav,index)=>(
            <Route key={index} path={nav.path} component={nav.component}/>
            ))
          }
        </Switch>
         { currentNav? <NavFoot navlist ={this.navList} /> :null}
      </div>
    )
  }
}
export default connect(
  state =>({user:state.User}),
  {getUser}
)(Dashbroad)