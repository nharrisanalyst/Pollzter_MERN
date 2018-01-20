import { connect } from 'react-redux';
import { registerUser } from '../actions/actions'
import Register from '../components/Register';


const mapStateToProps =(state)=>{
  return{
     notAuthorized:state.loggedIn.notAuthorized.notAuthorized,
     message:state.loggedIn.notAuthorized.message
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    submit: ev =>{
      dispatch(registerUser(ev))
    }
  }
}


const RegisterCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);


export default RegisterCont;
