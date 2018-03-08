import React,{Component} from 'react'

import './css/container_css.css'
import  logoImg from  './imgs/job.png'

  export default class Logo extends Component {
    render(){
      return(
        <div className="logo">
          <img src={logoImg} alt=""/>
        </div>
      )
    }
    }