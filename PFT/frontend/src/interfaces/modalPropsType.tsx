interface modalPropsType{
 open: boolean,
 onClose: ()=> void,
 onConfirm: ()=> void | Promise<void>,
 title:string,
 message:string
 

}

export default modalPropsType;