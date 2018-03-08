
  export  function redirect(avatar,type){
  let  path  =''
  path+=  type ==='boss'? '/boss':'/genius'
  if(!avatar){
    path+='info'
  }
  return path
}