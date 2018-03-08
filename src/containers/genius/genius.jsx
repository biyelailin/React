
import React,{Component} from 'react'
import {connect} from 'react-redux'
import UserList  from '../../components/user-list/user-list'
import  {getUserList} from '../../redux/actions'
class  Genius extends Component {

  componentDidMount(){

    this.props.getUserList('boss')
  }

  render(){

    return(
      <div>
        <UserList userlist ={this.props.userlist}/>
      </div>
    )
  }
}
export default connect(
  state =>({userlist:state.UserList}),
  {getUserList }
)(Genius)