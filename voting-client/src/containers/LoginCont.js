import { connect } from 'react-redux';
import { logInUser } from '../actions/actions';
import Login from '../components/Login';


const mapStateToProps =(state)=>{
  return{
      notAuthorized:state.loggedIn.notAuthorized.notAuthorized
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    submit: ev =>{
      dispatch(logInUser(ev))
    }
  }
}


const LoginCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);


export default LoginCont;
