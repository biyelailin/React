import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import  {TabBar} from 'antd-mobile'
import   {withRouter} from 'react-router-dom'


  class NavFoot extends Component {
  static  propTypes ={
     navlist:PropTypes.array.isRequired
   }

     render(){
           let {navlist} = this.props
         //过滤掉隐藏的
          let navlists =  navlist.filter(nav=>!nav.hide)
        // 当前的路径
             let {pathname} = this.props.location
            let  Item= TabBar.Item
       return(

            <TabBar>
              { navlists.map( nav=>(
                <Item
                  key={nav.path}
                  title={nav.text}
                  icon={require(`./imgs/${nav.icon}.png`)}
                  selectedIcon={require(`./imgs/${nav.icon}-active.png`)}
                  selected={nav.path === pathname}
                  onPress ={() => {
                  this.props.history.replace(nav.path)
                }
                }
               />

              )

                )
              }

            </TabBar>


       )
     }
     }
export default withRouter(NavFoot)