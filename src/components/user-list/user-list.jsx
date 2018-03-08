//书写boss或者genius的UI 组件
import React,{Component} from 'react'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
 import PropTypes from 'prop-types'
import  {withRouter} from 'react-router-dom'
   class UserList extends Component {

  static propType ={
    userlist :PropTypes.array.isRequired
  }

    render(){
       let {userlist} = this.props
      console.log(userlist)
      return(
        <div>
          <WingBlank>
            <WhiteSpace/>
            {
              userlist.map((user,index)=>(

                <Card key={user._id}  onClick={() => {this.props.history.push(`/chat/${user._id}`)}}>

                  <Card.Header
                    title={user.name}
                    thumb={require(`../../assets/imgs/${user.avatar}.png`)}
                    extra={<span>{user.title}</span>}
                  />
                  <WhiteSpace/>
                  <Card.Body>
                    {user.company?<div>{user.company}</div>:null}
                    <div>{user.desc}</div>
                    {user.money?<div>{user.money}</div>:null}

                  </Card.Body>

                </Card>
              ))
            }
          </WingBlank>

        </div>
      )
    }
    }

export default withRouter(UserList)