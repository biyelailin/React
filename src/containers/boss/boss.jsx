
import React,{Component} from 'react'
import {connect} from 'react-redux'
import UserList  from '../../components/user-list/user-list'
import  {getUserList} from '../../redux/actions'
 class Boss extends Component {

  componentDidMount(){
     this.props.getUserList('genius')
   }

  render(){
    return(
      <div>
       <UserList userlist = {this.props.userlist}/>
      </div>
    )
  }
}
export default connect(
   state =>({userlist:state.UserList}),
   {getUserList}
)(Boss)